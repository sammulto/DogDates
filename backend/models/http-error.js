//this class enable quick construct of http error object with a message and a code
"use strict";

class HttpError extends Error {
  constructor(message, errCode) {
    super(message);
    this.code = errCode;
  }
}

module.exports = HttpError;
