resource "aws_lambda_function" "get-scorecard-urls" {
  function_name    = "get-scorecard-urls"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/get-scorecard-urls.zip"
  source_code_hash = filebase64sha256("../functions/dist/get-scorecard-urls.zip")
  role             = aws_iam_role.get-scorecard-urls-role.arn

  runtime     = "nodejs14.x"
  timeout     = 600
  memory_size = 256

  layers = ["arn:aws:lambda:eu-west-2:604776666101:layer:chrome-aws-lambda:1"]
}

resource "aws_lambda_function" "create-processors" {
  function_name    = "create-processors"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/create-processors.zip"
  source_code_hash = filebase64sha256("../functions/dist/create-processors.zip")
  role             = aws_iam_role.create-processors-role.arn

  runtime = "nodejs14.x"
  timeout = 10

  environment {
    variables = merge({
      PROCESSOR_PROFILE_ARN           = aws_iam_instance_profile.scorecard-processor-profile.arn
      PROCESSOR_SG_ID                 = aws_security_group.allow_ssh.id,
      FIRST_TEAM_PROCESSOR_QUEUE_URL  = aws_sqs_queue.first-team-scorecard-html.url,
      SECOND_TEAM_PROCESSOR_QUEUE_URL = aws_sqs_queue.second-team-scorecard-html.url,
    }, {})
  }
}

resource "aws_lambda_function_event_invoke_config" "create-processors" {
  function_name          = aws_lambda_function.create-processors.function_name
  qualifier              = "$LATEST"
  maximum_retry_attempts = 0
}

resource "aws_lambda_event_source_mapping" "create-processors" {
  event_source_arn       = aws_dynamodb_table.live-score-urls.stream_arn
  function_name          = aws_lambda_function.create-processors.arn
  starting_position      = "LATEST"
  batch_size             = 1
  maximum_retry_attempts = 2
}

resource "aws_lambda_function" "teardown-processors" {
  function_name    = "teardown-processors"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/teardown-processors.zip"
  source_code_hash = filebase64sha256("../functions/dist/teardown-processors.zip")
  role             = aws_iam_role.teardown-processors-role.arn

  runtime = "nodejs14.x"
  timeout = 10
}

resource "aws_lambda_function" "create-scorecard" {
  function_name    = "create-scorecard"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/create-scorecard.zip"
  source_code_hash = filebase64sha256("../functions/dist/create-scorecard.zip")
  role             = aws_iam_role.create-scorecard-role.arn

  runtime = "nodejs14.x"
  timeout = 10

  environment {
    variables = merge({
      FIRST_TEAM_QUEUE_ARN  = aws_sqs_queue.first-team-scorecard-html.arn,
      SECOND_TEAM_QUEUE_ARN = aws_sqs_queue.second-team-scorecard-html.arn,
      SCORECARD_BUCKET_NAME = aws_s3_bucket.scorecards.bucket,
    }, {})
  }
}

resource "aws_lambda_event_source_mapping" "create-first-team-scorecard-sqs-source" {
  event_source_arn = aws_sqs_queue.first-team-scorecard-html.arn
  function_name    = aws_lambda_function.create-scorecard.function_name
  batch_size       = 10
}

resource "aws_lambda_event_source_mapping" "create-second-team-scorecard-sqs-source" {
  event_source_arn = aws_sqs_queue.second-team-scorecard-html.arn
  function_name    = aws_lambda_function.create-scorecard.function_name
  batch_size       = 10
}

resource "aws_lambda_function" "socket-connect" {
  function_name    = "socket-connect"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/socket-connect.zip"
  source_code_hash = filebase64sha256("../functions/dist/socket-connect.zip")
  role             = aws_iam_role.socket-connect-role.arn

  runtime = "nodejs14.x"
  timeout = 10
}

resource "aws_lambda_permission" "socket-connect" {
  statement_id  = "AllowAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.socket-connect.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.live-scores.execution_arn}/*/*/*"
}

resource "aws_lambda_function" "socket-disconnect" {
  function_name    = "socket-disconnect"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/socket-disconnect.zip"
  source_code_hash = filebase64sha256("../functions/dist/socket-disconnect.zip")
  role             = aws_iam_role.socket-disconnect-role.arn

  runtime = "nodejs14.x"
  timeout = 10
}

resource "aws_lambda_permission" "socket-disconnect" {
  statement_id  = "AllowAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.socket-disconnect.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.live-scores.execution_arn}/*/*/*"
}
