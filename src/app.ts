import Express from "express";

import { router } from "./routes.js";
import versioningMiddleware from "./middlewares/versioning.js";

const app = Express();

app.use(versioningMiddleware);
app.use(Express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Running at port 3000"); // eslint-disable-line no-console
});
