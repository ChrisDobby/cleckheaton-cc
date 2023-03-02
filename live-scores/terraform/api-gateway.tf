// live scores web socket
resource "aws_apigatewayv2_api" "live-scores" {
  name                       = "cleckheaton-live-scores"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

resource "aws_apigatewayv2_integration" "live-scores-connect" {
  api_id           = aws_apigatewayv2_api.live-scores.id
  integration_type = "AWS_PROXY"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  integration_uri           = module.socket-connect.invoke_arn
  integration_method        = "POST"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_integration" "live-scores-disconnect" {
  api_id           = aws_apigatewayv2_api.live-scores.id
  integration_type = "AWS_PROXY"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  integration_uri           = module.socket-disconnect.invoke_arn
  integration_method        = "POST"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "live-scores-connect" {
  api_id    = aws_apigatewayv2_api.live-scores.id
  route_key = "$connect"
  target    = "integrations/${aws_apigatewayv2_integration.live-scores-connect.id}"
}

resource "aws_apigatewayv2_route" "live-scores-disconnect" {
  api_id    = aws_apigatewayv2_api.live-scores.id
  route_key = "$disconnect"
  target    = "integrations/${aws_apigatewayv2_integration.live-scores-disconnect.id}"
}

resource "aws_apigatewayv2_stage" "live-scores-prod" {
  api_id = aws_apigatewayv2_api.live-scores.id
  name   = "prod"
}

resource "aws_apigatewayv2_deployment" "live-scores" {
  api_id = aws_apigatewayv2_api.live-scores.id

  triggers = {
    redeployment = sha1(join(",", [
      jsonencode(aws_apigatewayv2_api.live-scores),
      jsonencode(aws_apigatewayv2_integration.live-scores-connect),
      jsonencode(aws_apigatewayv2_route.live-scores-connect),
      jsonencode(aws_apigatewayv2_integration.live-scores-disconnect),
      jsonencode(aws_apigatewayv2_route.live-scores-disconnect),
      jsonencode(aws_apigatewayv2_stage.live-scores-prod),
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

// push notification registration
resource "aws_apigatewayv2_api" "notifications" {
  name          = "cleckheaton-notifications"
  protocol_type = "HTTP"

  cors_configuration {
    allow_headers = ["*"]
    allow_methods = ["POST"]
    allow_origins = ["*"]
  }
}

resource "aws_apigatewayv2_integration" "notifications-subscribe" {
  api_id           = aws_apigatewayv2_api.notifications.id
  integration_type = "AWS_PROXY"

  connection_type      = "INTERNET"
  integration_uri      = module.subscribe-to-scores.invoke_arn
  integration_method   = "POST"
  passthrough_behavior = "WHEN_NO_MATCH"
}

resource "aws_apigatewayv2_route" "notifications-subscribe" {
  api_id    = aws_apigatewayv2_api.notifications.id
  route_key = "POST /subscribe-to-scores"
  target    = "integrations/${aws_apigatewayv2_integration.notifications-subscribe.id}"
}

resource "aws_apigatewayv2_stage" "notifications-prod" {
  api_id = aws_apigatewayv2_api.notifications.id
  name   = "prod"
}


resource "aws_apigatewayv2_deployment" "notifications" {
  api_id = aws_apigatewayv2_api.notifications.id

  triggers = {
    redeployment = sha1(join(",", [
      jsonencode(aws_apigatewayv2_api.notifications),
      jsonencode(aws_apigatewayv2_integration.notifications-subscribe),
      jsonencode(aws_apigatewayv2_route.notifications-subscribe),
      jsonencode(aws_apigatewayv2_stage.notifications-prod),
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}
