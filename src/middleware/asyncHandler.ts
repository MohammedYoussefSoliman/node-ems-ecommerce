import { NextFunction, Request, Response } from 'express'

/**
 * A middleware function to handle asynchronous route handlers and middleware in Express.js.
 * This function wraps an asynchronous function and ensures that any errors are caught and passed
 * to the next middleware or error handler.
 *
 * @param callback - An asynchronous function that takes Express.js request, response, and next function as arguments.
 * @returns A function that takes Express.js request, response, and next function as arguments, and returns a Promise.
 *
 * @example
 * ```js
 * import express from 'express';
 * import { asyncHandler } from './middleware/asyncHandler';
 *
 * const router = express.Router();
 *
 * router.get('/example', asyncHandler(async (req, res, next) => {
 *   const data = await someAsyncOperation();
 *   res.json(data);
 * }));
 *
 * export default router;
 * ```
 */
export const asyncHandler = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(callback(req, res, next)).catch(next)
}
