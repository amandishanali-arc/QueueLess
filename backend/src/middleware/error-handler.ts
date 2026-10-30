import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  next,
) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  // Express's body parser attaches an HTTP status to invalid requests.
  const errorStatus =
    typeof error === "object" && error !== null && "status" in error
      ? error.status
      : undefined;
  const status =
    typeof errorStatus === "number" &&
    Number.isInteger(errorStatus) &&
    errorStatus >= 400 &&
    errorStatus < 500
      ? errorStatus
      : 500;

  const messages: Record<number, string> = {
    400: "Invalid request body",
    413: "Request body is too large",
    415: "Unsupported request encoding or charset",
  };

  if (status === 500) {
    console.error("Unhandled request error:", error);
  }

  res.status(status).json({
    status: "error",
    message: status === 500 ? "Internal server error" : (messages[status] ?? "Invalid request"),
  });
};
