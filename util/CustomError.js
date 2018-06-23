class CustomError extends Error {
  constructor(message, messageToEdit) {
    super(message);
    this.msg = messageToEdit;
  }

  get name() {
    return this.constructor.name;
  }
}

class ParseError extends CustomError {}
class UsageError extends CustomError {}
class APIError extends CustomError {}

module.exports = { ParseError, CustomError, UsageError, APIError };
