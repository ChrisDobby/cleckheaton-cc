export const handler = async ({ Records }) => {
  console.log(JSON.stringify(Records, null, 2));
  //  await Promise.all(Records.map(({ Sns: { Message } }) => putToS3(JSON.parse(Message))));
};
