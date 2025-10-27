// swift-tools-version: 6.1

import PackageDescription

let package = Package(
    name: "swift-demangle.wasm",
    platforms: [
        .macOS(.v10_15),
    ],
    dependencies: [
        .package(url: "https://github.com/swiftwasm/JavaScriptKit.git", from: "0.36.0"),
    
    ],
    targets: [
        .executableTarget(
            name: "swift-demangle",
            dependencies: [
                .product(name: "JavaScriptKit", package: "JavaScriptKit"),
            ],
            exclude: [
                "Generated/JavaScript",
                "bridge-js.config.json",
            ],
            swiftSettings: [
                .enableExperimentalFeature("Extern"),
            ]
        ),
    ]
)
