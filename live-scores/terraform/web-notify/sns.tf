resource "aws_sns_topic_subscription" "web-notify" {
  topic_arn = var.push_topic_arn
  protocol  = "lambda"
  endpoint  = aws_lambda_function.web-notify.arn
}
