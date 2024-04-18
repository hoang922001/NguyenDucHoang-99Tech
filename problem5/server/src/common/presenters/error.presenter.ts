class BaseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends BaseError {
  readonly status = 404;
  readonly message: string = this.message ?? 'Not Found'
}

export class UnauthorizeException extends BaseError {
  readonly status = 401;
  readonly message: string = this.message ?? 'Unauthorize'
}

export class ForbiddenException extends BaseError {
  readonly status = 403;
  readonly message: string = this.message ?? 'Forbidden'
}

export class BadRequestException extends BaseError {
  readonly status = 400;
  readonly message: string = this.message ?? 'Bad Request'
}