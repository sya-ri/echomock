import type { MockData } from "./type.js";

const mocks = new Map<string, MockData>();

const getKey = (method: string, path: string): string => `${method}:${path}`;

export const registerMock = (mock: MockData) => {
	mocks.set(getKey(mock.method, mock.path), mock);
};

export const deleteMock = (method: string, path: string): boolean => {
	return mocks.delete(getKey(method, path));
};

export const getMock = (method: string, path: string) => {
	return mocks.get(getKey(method, path));
};
