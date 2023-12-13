import type { NextFunction, Request, Response } from "express";

import config from "../config/index.js";

/**
 * Middleware to enable versioning by settting a custom request header called 'Api-Version'.
 * Takes version from the 'Accept' header (Accept: application/json; version=1)
 */
export default function versioningMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let version = config.defaultApiVersion;
  const [, versionInfo] = req.header("Accept")!.split(";");
  if (versionInfo && versionInfo.includes("version=")) {
    version = versionInfo.trim().slice(8) || version;
  }
  req.headers["Api-Version"] = version;
  next();
}
