#!/usr/bin/env node

import { serve } from "../index.js";

const port = Number.parseInt(process.argv[2] ?? "8080", 10);
if (Number.isNaN(port)) {
	console.error("Invalid port number");
	process.exit(1);
}

console.log(`Starting echomock server on port ${port}...`);
serve(port);
