import JavaScriptKit

@_extern(c, "swift_demangle")
func _stdlib_demangleImpl(
  mangledName: UnsafePointer<CChar>?,
  mangledNameLength: UInt,
  outputBuffer: UnsafeMutablePointer<CChar>?,
  outputBufferSize: UnsafeMutablePointer<UInt>?,
  flags: UInt32
) -> UnsafeMutablePointer<CChar>?

func swift_demangle(_ mangledName: String) -> String {
  var mangledName = mangledName
  let demangledName = mangledName.withUTF8 { (mangledNameUTF8) in
    let demangledNamePtr = _stdlib_demangleImpl(
      mangledName: UnsafeRawPointer(mangledNameUTF8.baseAddress!).assumingMemoryBound(to: CChar.self),
      mangledNameLength: UInt(mangledNameUTF8.count),
      outputBuffer: nil,
      outputBufferSize: nil,
      flags: 0
    )
    return demangledNamePtr.map { String(cString: $0) }
  }
  return demangledName ?? mangledName
}

let document = JSObject.global.document.object!
let body = document.body
let h1 = document.createElement!("h1")
h1.textContent = "swift-demangle.wasm"
_ = body.appendChild(h1)

let input = document.createElement!("textarea")
input.placeholder = "Enter mangled name"
input.style.width = "80%"
_ = body.appendChild(input)

let output = document.createElement!("pre")
_ = body.appendChild(output)

_ = input.addEventListener("input", JSClosure { _ in
  guard let mangledName = input.value.string else { return JSValue.undefined }
  let demangledName = swift_demangle(mangledName)
  output.textContent = .string(demangledName)
  return JSValue.undefined
})
