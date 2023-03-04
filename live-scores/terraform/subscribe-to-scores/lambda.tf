resource "aws_lambda_function" "subscribe-to-scores" {
  function_name    = "subscribe-to-scores"
  handler          = "lib/index.handler"
  filename         = "../functions/dist/subscribe-to-scores.zip"
  source_code_hash = filebase64sha256("../functions/dist/subscribe-to-scores.zip")
  role             = aws_iam_role.subscribe-to-scores.arn

  runtime = "nodejs18.x"
  timeout = 10
}

resource "aws_lambda_permission" "subscribe-to-scores" {
  statement_id  = "AllowAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.subscribe-to-scores.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.notifications_execution_arn}/*/*/*"
}