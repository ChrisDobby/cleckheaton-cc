import { EC2Client, RunInstancesCommand, RunInstancesCommandOutput } from '@aws-sdk/client-ec2';

const USER_DATA = `#!/bin/bash
yum update -y
yum install -y git
yum install -y pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install -y nodejs
git clone https://github.com/ChrisDobby/cleckheaton-cc.git
cd cleckheaton-cc/live-scores/scorecard-processor
npm ci
npm run build
npm i -g pm2
`;

const client = new EC2Client({ region: 'eu-west-2' });

const getQueueUrl = (teamId: string) => {
  switch (teamId) {
    case '1':
      return process.env.FIRST_TEAM_PROCESSOR_QUEUE_URL as string;
    case '2':
      return process.env.SECOND_TEAM_PROCESSOR_QUEUE_URL as string;
    default:
      return '';
  }
};

type ScorecardUrl = { teamId: string; scorecardUrl: string };
const getStartCommand = ({ teamId, scorecardUrl }: ScorecardUrl) => `pm2 start npm --name="team-${teamId}" -- start ${scorecardUrl} ${getQueueUrl(teamId)}`;

const createInstance = (scorecardUrls: ScorecardUrl[]) => {
  const userData = `${USER_DATA} ${scorecardUrls.map(getStartCommand).join('\n')}`;
  const command = new RunInstancesCommand({
    ImageId: 'ami-0d729d2846a86a9e7',
    InstanceType: 't2.micro',
    MaxCount: 1,
    MinCount: 1,
    KeyName: 'test-processor',
    SecurityGroupIds: [process.env.PROCESSOR_SG_ID as string],
    IamInstanceProfile: { Arn: process.env.PROCESSOR_PROFILE_ARN },
    UserData: Buffer.from(userData).toString('base64'),
    TagSpecifications: [
      {
        ResourceType: 'instance',
        Tags: [
          { Key: 'Owner', Value: 'cleckheaton-cc' },
          { Key: 'InProgress', Value: scorecardUrls.length.toString() },
        ],
      },
    ],
  });

  return client.send(command);
};

const getScorecardUrl = (teamId: string, field?: { S: string }) => (!field ? null : { teamId, scorecardUrl: field.S });

const handleRecord = async ({ dynamodb: { NewImage } }): Promise<RunInstancesCommandOutput | null> => {
  if (!NewImage) {
    return null;
  }

  console.log(JSON.stringify(NewImage, null, 2));
  const { firstTeam, secondTeam } = NewImage;
  return createInstance([getScorecardUrl('1', firstTeam), getScorecardUrl('2', secondTeam)].filter(Boolean) as ScorecardUrl[]);
};

export const handler = async ({ Records }) => {
  await Promise.all(Records.map(handleRecord));
};
