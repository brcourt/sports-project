import {
  APIGatewayProxyResult,
  type APIGatewayProxyStructuredResultV2,
} from "aws-lambda";

const CORS_HEADERS = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,PATCH,DELETE",
};

export function okResult(result?: object): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: result ? JSON.stringify(result) : "",
  };
}

export function errResult(err: any): APIGatewayProxyStructuredResultV2 {
  let statusCode = err.statusCode || 500;
  let body = {
    name: err.name || "Error",
    message: err.message || "",
  };

  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}
