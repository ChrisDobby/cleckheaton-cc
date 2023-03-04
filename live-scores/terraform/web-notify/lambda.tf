resource "aws_lambda_function" "web-notify" {
  function_name    = "web-notify"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/web-notify.zip"
  source_code_hash = filebase64sha256("../functions/dist/web-notify.zip")
  role             = aws_iam_role.web-notify.arn

  runtime = "nodejs18.x"
  timeout = 10

  environment {
    variables = merge({
      VAPID_SUBJECT     = var.vapid_subject,
      VAPID_PUBLIC_KEY  = var.vapid_public_key,
      VAPID_PRIVATE_KEY = var.vapid_private_key,
    }, {})
  }
}

resource "aws_lambda_permission" "web-notify" {
  statement_id  = "AllowExecutionFromSNS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.web-notify.function_name
  principal     = "sns.amazonaws.com"
  source_arn    = var.push_topic_arn
}