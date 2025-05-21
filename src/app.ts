import { Hono } from "hono";
import {
	X_TESTMOCK_PATH,
	X_TESTMOCK_METHOD,
	X_TESTMOCK_ID,
	X_TESTMOCK_RES,
	X_TESTMOCK_RES_LENGTH,
	X_TESTMOCK_CODE,
} from "./const.js";
import { addMock, deleteMock, getMock } from "./store.js";

export default new Hono()
	.post("/testmock", async (c) => {
		const method = c.req.header(X_TESTMOCK_METHOD);
		if (!method?.length) {
			return c.json(
				{
					message: `${X_TESTMOCK_METHOD} must not be empty`,
				},
				400,
			);
		}
		const path = c.req.header(X_TESTMOCK_PATH);
		if (!path?.length) {
			return c.json(
				{
					message: `${X_TESTMOCK_PATH} must not be empty`,
				},
				400,
			);
		}
		const rawCode = c.req.header(X_TESTMOCK_CODE);
		if (!rawCode) {
			return c.json(
				{
					message: `${X_TESTMOCK_CODE} must not be empty`,
				},
				400,
			);
		}
		const code = Number.parseInt(rawCode);
		if (Number.isNaN(code)) {
			return c.json(
				{
					message: `${X_TESTMOCK_CODE} must be integer, actual ${rawCode}`,
				},
				400,
			);
		}
		const headers = Object.fromEntries(
			Object.entries(c.req.header())
				.filter(([key]) => key.startsWith(X_TESTMOCK_RES))
				.map(([key, value]) => [key.slice(X_TESTMOCK_RES_LENGTH), value]),
		);
		const body = c.req.raw.body
			? new Uint8Array(await c.req.arrayBuffer())
			: null;
		addMock({
			method,
			path,
			code,
			headers,
			body,
		});
		return c.json({
			message: "Successfully added",
		});
	})
	.delete("/testmock", async (c) => {
		const method = c.req.header(X_TESTMOCK_METHOD);
		if (!method?.length) {
			return c.json(
				{
					message: `${X_TESTMOCK_METHOD} must not be empty`,
				},
				400,
			);
		}
		const path = c.req.header(X_TESTMOCK_PATH);
		if (!path?.length) {
			return c.json(
				{
					message: `${X_TESTMOCK_PATH} must not be empty`,
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
