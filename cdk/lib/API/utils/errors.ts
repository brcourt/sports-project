export abstract class HTTPError extends Error {
  public statusCode: number;
}

export class NotFoundError extends HTTPError {
  constructor(msg: string) {
    super(msg);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class ApiValidationError extends HTTPError {
  constructor(msg: string) {
    super(msg);
    this.name = "ApiValidationError";
    this.statusCode = 400;
  }
}

export class StorageValidationError extends HTTPError {
  constructor(msg: string) {
    super(msg);
    this.name = "StorageValidationError";
    this.statusCode = 400;
  }
}

export class MissingArgumentError extends HTTPError {
  constructor(msg: string) {
    super(msg);
    this.name = "MissingArgumentError";
    this.statusCode = 400;
  }
}

export class MissingEnvVarError extends HTTPError {
  constructor(msg: string) {
    super(msg);
    this.name = "MissingEnvVarError";
    this.statusCode = 500;
  }
}

// export function AlreadyExistsError(data: any): Error {
//   const errorMessage = `Recipe ${data.stuff} already exists.`;
//   const error = new Error(errorMessage);
//   error.name = 'RecipeAlreadyExistsError';
//   return error;
// }

// export function InvalidKeysError(data: any): Error {
//   const errorMessage = `Recipe ${data.stuff}`;
//   const error = new Error(errorMessage);
//   error.name = 'RecipeNotFoundError';
//   return error;
// }
