/**
 * AnchorHub — application entrypoint.
 *
 * PSEUDOCODE:
 *   1. Load & validate env vars
 *   2. Build Fastify instance with pino logger
 *   3. Register plugins: @fastify/jwt, @fastify/rate-limit
 *   4. Register global error handler
 *   5. Register API routes under /api/v1 with auth preHandler
 *   6. Start listening on PORT
 *   7. Handle graceful shutdown (SIGTERM/SIGINT)
 */

import Fastify from "fastify";
import { errorHandler } from "./api/middleware/errorHandler";
import { anchorsRoutes } from "./api/v1/anchors";
import { depositRoutes } from "./api/v1/deposit";
import { withdrawRoutes } from "./api/v1/withdraw";
import { quoteRoutes } from "./api/v1/quote";
import { healthRoutes } from "./api/v1/health";

const PORT = Number(process.env.PORT ?? 3000);

async function build() {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL ?? "info" },
  });

  // TODO: register @fastify/jwt plugin with JWT_SECRET
  // TODO: register @fastify/rate-limit plugin with Redis store

  app.setErrorHandler(errorHandler);

  // Public health check (no auth)
  app.register(healthRoutes, { prefix: "/api/v1/health" });

  // Authenticated routes
  // TODO: add authMiddleware as preHandler for the routes below
  app.register(anchorsRoutes, { prefix: "/api/v1/anchors" });
  app.register(depositRoutes, { prefix: "/api/v1/deposit" });
  app.register(withdrawRoutes, { prefix: "/api/v1/withdraw" });
  app.register(quoteRoutes, { prefix: "/api/v1/quote" });

  return app;
}

async function main() {
  const app = await build();

  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  const shutdown = async () => {
    app.log.info("Shutting down...");
    await app.close();
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main();
