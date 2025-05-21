import { Hono } from "hono";
import {
	X_ECHOMOCK_CODE,
	X_ECHOMOCK_METHOD,
	X_ECHOMOCK_PATH,
	X_ECHOMOCK_RES,
	X_ECHOMOCK_RES_LENGTH,
} from "./const.js";
import { deleteAllMocks, deleteMock, getMock, registerMock } from "./store.js";

export default new Hono()
	.post("/echomock", async (c) => {
		const method = c.req.header(X_ECHOMOCK_METHOD);
		if (!method?.length) {
			return c.json(
				{
					message: `${X_ECHOMOCK_METHOD} must not be empty`,
				},
				400,
			);
		}
		const path = c.req.header(X_ECHOMOCK_PATH);
		if (!path?.length) {
			return c.json(
				{
					message: `${X_ECHOMOCK_PATH} must not be empty`,
				},
				400,
			);
		}
		const rawCode = c.req.header(X_ECHOMOCK_CODE);
		if (!rawCode) {
			return c.json(
				{
					message: `${X_ECHOMOCK_CODE} must not be empty`,
				},
				400,
			);
		}
		const code = Number.parseInt(rawCode);
		if (Number.isNaN(code)) {
			return c.json(
				{
					message: `${X_ECHOMOCK_CODE} must be integer, actual ${rawCode}`,
				},
				400,
			);
		}
		const headers = Object.fromEntries(
			Object.entries(c.req.header())
				.filter(([key]) => key.startsWith(X_ECHOMOCK_RES))
				.map(([key, value]) => [key.slice(X_ECHOMOCK_RES_LENGTH), value]),
		);
		const body = c.req.raw.body
			? new Uint8Array(await c.req.arrayBuffer())
			: null;
		registerMock({
			method,
			path,
			code,
			headers,
			body,
		});
		return c.json({
			message: "Successfully registered",
		});
	})
	.delete("/echomock", async (c) => {
		const method = c.req.header(X_ECHOMOCK_METHOD);
		if (!method?.length) {
			return c.json(
				{
					message: `${X_ECHOMOCK_METHOD} must not be empty`,
				},
				400,
			);
		}
		const path = c.req.header(X_ECHOMOCK_PATH);
		if (!path?.length) {
			return c.json(
				{
					message: `${X_ECHOMOCK_PATH} must not be empty`,
				},
				400,
			);
		}
		const success = deleteMock(method, path);
		if (!success) {
			return c.json(
				{
					message: "Not found mock",
				},
				404,
			);
		}
		return c.json({
			message: "Successfully deleted",
		});
	})
	.delete("/echomock/all", (c) => {
		deleteAllMocks();
		return c.json({ message: "All mocks deleted" });
	})
	.all("/*", async (c) => {
		const mock = getMock(c.req.method, c.req.path);
		if (!mock) {
			return c.json(
				{
					message: "Not found mock",
				},
				404,
			);
		}
		return new Response(mock.body, {
			status: mock.code,
			headers: mock.headers,
		});
	});
