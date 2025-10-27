# swift-demangle.wasm

A Swift demangling library compiled to WebAssembly, allowing you to demangle Swift symbol names in web browsers and Node.js environments.

## Overview

Swift uses name mangling to encode type information and other metadata into symbol names during compilation. This results in cryptic symbol names like `$sSi1soiyS2i_SitFZ` which correspond to human-readable function signatures like `static Swift.Int.- infix(Swift.Int, Swift.Int) -> Swift.Int`.

This package provides a WebAssembly-compiled Swift demangler that can convert these mangled names back to their readable form, making it useful for:

- Crash report analysis
- Development tools and IDEs
- Symbol inspection utilities

## Installation

```bash
npm install swift-demangle-wasm
```

## Usage

### Node.js

```javascript
import init from "swift-demangle-wasm";

const demangle = await init();
const result = demangle("$sSi1soiyS2i_SitFZ");
console.log(result);
// Output: "static Swift.Int.- infix(Swift.Int, Swift.Int) -> Swift.Int"
```

### Browser

```javascript
import init from "swift-demangle-wasm";

// The browser version requires loading the WASM module
const response = await fetch("path/to/swift-demangle.wasm");
const demangle = await init({ module: response });

const result = demangle("$sSi1soiyS2i_SitFZ");
console.log(result);
// Output: "static Swift.Int.- infix(Swift.Int, Swift.Int) -> Swift.Int"
```

## API Reference

### `init(options?: InitializeOptions): Promise<Demangler>`

Initializes the WASM module and returns a demangler function.

**Parameters:**
- `options` (optional): Initialization options
  - `module`: A `Response` object or ArrayBuffer containing the Wasm module (required for browser environments)

**Returns:**
- `Promise<Demangler>`: A promise that resolves to a demangler function

### `Demangler(mangledName: string): string`

Demangles a Swift symbol name.

**Parameters:**
- `mangledName`: The mangled Swift symbol name to demangle

**Returns:**
- `string`: The demangled, human-readable symbol name. If demangling fails, returns the original input.

## Building from Source

If you want to build this project yourself, you'll need to set up the Swift WebAssembly toolchain.

### Prerequisites

Swift 6.2+ toolchain from swift.org

### Environment Setup

Before building, you need to configure your shell environment to use the correct Swift toolchain and SDK:

```bash
# Set up the Swift toolchain path
export PATH=$HOME/Library/Developer/Toolchains/swift-6.2-RELEASE.xctoolchain/usr/bin:$PATH

# Install Swift SDK for WebAssembly if you haven't installed it
swift sdk install https://download.swift.org/swift-6.2-release/wasm/swift-6.2-RELEASE/swift-6.2-RELEASE_wasm.artifactbundle.tar.gz --checksum fe4e8648309fce86ea522e9e0d1dc48e82df6ba6e5743dbf0c53db8429fb5224

# Install dependency packages
npm install
```

### Building

To build package:

```bash
./build.sh
```

### Testing

To run tests after building:

```bash
npm test
```

This runs both Node.js and browser tests using Vitest.

## License

MIT
