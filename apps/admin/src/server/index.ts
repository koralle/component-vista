import { Hono } from "hono";

export const app = new Hono()
  .basePath("/api")
  .get("/", (c) => c.json({ message: "Hello, world!" }));
