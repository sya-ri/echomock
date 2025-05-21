# echomock

[![npm version](https://badge.fury.io/js/echomock.svg)](https://badge.fury.io/js/echomock)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight and flexible API mocking tool that focuses on accurate response handling. Perfect for testing and development environments.

## Features

- 🔄 **Request Body Echo**: Automatically returns request body as response body
- 🎯 **Dynamic Headers**: Set response headers using `X-ECHOMOCK-RES-<HEADER_NAME>` format
- 📝 **RESTful API**: Manage mocks through simple REST endpoints
- 🚀 **Simple Integration**: Easy to use in any development or testing environment

## Installation

```bash
npm install -D echomock
```

## Quick Start

### Register a Mock

```bash
curl -X POST --location "http://localhost:8080/echomock" \
    -H "X-ECHOMOCK-METHOD: GET" \
    -H "X-ECHOMOCK-PATH: /example" \
    -H "X-ECHOMOCK-CODE: 200" \
    -H "X-ECHOMOCK-RES-Content-Type: application/json" \
    -d '{ "message": "hello from echomock!!" }'
```

### Delete a Mock

```bash
curl -X DELETE --location "http://localhost:8080/echomock"
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
