// NOTICE: This is auto-generated code by BridgeJS from JavaScriptKit,
// DO NOT EDIT.
//
// To update this file, just rebuild your project or run
// `swift package bridge-js`.

@_spi(BridgeJS) import JavaScriptKit

@_expose(wasm, "bjs_demangle")
@_cdecl("bjs_demangle")
public func _bjs_demangle(mangledNameBytes: Int32, mangledNameLength: Int32) -> Void {
    #if arch(wasm32)
    let ret = demangle(_: String.bridgeJSLiftParameter(mangledNameBytes, mangledNameLength))
    return ret.bridgeJSLowerReturn()
    #else
    fatalError("Only available on WebAssembly")
    #endif
}