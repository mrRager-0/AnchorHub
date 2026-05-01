/**
 * Global error handler — normalises all thrown errors into a consistent JSON shape.
 *
 * PSEUDOCODE:
 *   1. If error is a ZodError → 400 with field-level validation details
 *   2. If error has a statusCode property → use it
 *   3. Otherwise → 500, log full error, return generic message
 *   4. Never leak stack traces in production
 */

import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function errorHandler(
  error: FastifyError | Error,
  _req: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: "Validation error",
      details: error.flatten().fieldErrors,
    });
  }

  const statusCode = (error as FastifyError).statusCode ?? 500;

  if (statusCode >= 500) {
    // TODO: emit to Prometheus error counter / structured logger
    console.error(error);
  }

  return reply.status(statusCode).send({
    error: statusCode >= 500 ? "Internal server error" : error.message,
  });
}
