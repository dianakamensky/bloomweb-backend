class HttpError extends Error {
  constructor(msg, statusCode = 500) {
    super(msg);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends HttpError {
  constructor(msg = "Bad Request") {
    super(msg, 400);
  }
}

class UnauthorizedError extends HttpError {
  constructor(msg = "Incorrect password or username") {
    super(msg, 401);
  }
}

class ForbiddenError extends HttpError {
  constructor(msg = "Forbidden") {
    super(msg, 403);
  }
}

class NotFoundError extends HttpError {
  constructor(msg = "Not found") {
    super(msg, 404);
  }
}

class ConflictError extends HttpError {
  constructor(msg = "Conflict") {
    super(msg, 409);
  }
}

function handleError(err, res) {
  const { statusCode = 500 } = err;
  const message = err.toString();
  res.status(statusCode).send({ message });
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  handleError,
};
