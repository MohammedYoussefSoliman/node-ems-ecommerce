interface IApiError extends Error {
  statusCode: number
  status: 'error' | 'failure'
  isOperational: boolean
}

export class ApiError extends Error implements IApiError {
  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage)
    this.statusCode = statusCode
    this.status = String(statusCode).startsWith('4') ? 'failure' : 'error'
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
  statusCode: number
  status: 'error' | 'failure'
  isOperational: boolean
}
