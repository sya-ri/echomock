# echomock

[![npm version](https://badge.fury.io/js/@sya-ri%2Fechomock.svg)](https://badge.fury.io/js/@sya-ri%2Fechomock)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and flexible API mocking tool that focuses on accurate response handling. Perfect for testing and development environments.

## Features

- 🔄 **Request Body Echo**: Automatically returns request body as response body
- 🎯 **Dynamic Headers**: Set response headers using `X-ECHOMOCK-RES-<HEADER_NAME>` format
- 📝 **RESTful API**: Manage mocks through simple REST endpoints
- 🚀 **Simple Integration**: Easy to use in any development or testing environment
- 💻 **CLI Support**: Start the server directly with `npx @sya-ri/echomock`
- 📚 **Library Mode**: Use as a library in your TypeScript/JavaScript projects

## Quick Start

### CLI Usage

1. Start the server:
```bash
npx @sya-ri/echomock

# or specify port
npx @sya-ri/echomock 3000
```

2. Register a mock:
```bash
curl -X POST --location "http://localhost:8080/echomock" \
    -H "X-ECHOMOCK-METHOD: GET" \
    -H "X-ECHOMOCK-PATH: /example" \
    -H "X-ECHOMOCK-CODE: 200" \
    -H "X-ECHOMOCK-RES-Content-Type: application/json" \
    -d '{ "message": "hello from echomock!!" }'
```

3. Try the mock:
```bash
curl -X GET --location "http://localhost:8080/example"
```

4. Delete the mock:
```bash
curl -X DELETE --location "http://localhost:8080/echomock" \
    -H "X-ECHOMOCK-METHOD: GET" \
    -H "X-ECHOMOCK-PATH: /example"
```

### Library Usage

1. Install as a dev dependency:
```bash
npm install -D @sya-ri/echomock
```

2. Use in your code:
```typescript
import { serve, registerMock, deleteMock } from "@sya-ri/echomock";

// Start the server
serve(3000);

// Register a mock
await registerMock({
  method: "GET",
  path: "/example",
  code: 200,
  headers: {
    "Content-Type": "application/json"
  },
  body: new TextEncoder().encode(JSON.stringify({
    message: "hello from echomock!!"
  }))
});

// Delete a mock
deleteMock("GET", "/example");
```

## Use Cases

- **API Testing**: Create predictable test environments
- **Development**: Mock external services during development
- **Integration Testing**: Test API integrations without real endpoints
- **Load Testing**: Simulate various API responses for performance testing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
