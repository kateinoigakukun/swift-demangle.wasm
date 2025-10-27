#!/usr/bin/env bash

set -euxo pipefail

SWIFT_SDK_ID=${SWIFT_SDK_ID:-swift-6.2-RELEASE_wasm}

env JAVASCRIPTKIT_EXPERIMENTAL_BRIDGEJS=1 swift package --swift-sdk "$SWIFT_SDK_ID" js -c release
npx esbuild --bundle --format=esm --external:@bjorn3/browser_wasi_shim --platform=node src/index.node.js --outfile=dist/index.node.js
npx esbuild --bundle --format=esm --external:@bjorn3/browser_wasi_shim --platform=browser src/index.browser.js --outfile=dist/index.browser.js
cp ./.build/plugins/PackageToJS/outputs/Package/swift-demangle.wasm dist/swift-demangle.wasm
