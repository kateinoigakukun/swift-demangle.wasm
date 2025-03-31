// swift-tools-version: 6.0
import PackageDescription

let package = Package(
  name: "SwiftDemangle",
  dependencies: [
    .package(url: "https://github.com/swiftwasm/JavaScriptKit.git", from: "0.26.1"),
  ],
  targets: [
    .executableTarget(
      name: "SwiftDemangle",
      dependencies: [
        .product(name: "JavaScriptKit", package: "JavaScriptKit"),
      ],
      swiftSettings: [
        .enableExperimentalFeature("Extern")
      ]
    ),
  ]
)
