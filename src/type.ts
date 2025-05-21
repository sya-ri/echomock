export type MockData = {
	method: string;
	path: string;
	code: number;
	headers: Record<string, string>;
	body: Uint8Array | null;
};
