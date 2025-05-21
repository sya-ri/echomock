import { serve as honoServe } from "@hono/node-server";
import app from "./app.js";

export const serve = (port: number) => {
	return honoServe({
		fetch: app.fetch,
		port,
	});
};
