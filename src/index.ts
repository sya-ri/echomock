import { serve as honoServe } from "@hono/node-server";
import app from "./app.js";
import { deleteAllMocks, deleteMock, registerMock } from "./store.js";

export const serve = (port = 8080) => {
	return honoServe({
		fetch: app.fetch,
		port,
	});
};

export { registerMock, deleteMock, deleteAllMocks };
