import init from "../dist/index.browser.js"
import { page } from 'vitest/browser'
import { test, expect } from "vitest"

test("smoke check on browser", async () => {
    const response = await fetch("../dist/swift-demangle.wasm")
    const demangle = await init({ module: response })
    expect(demangle("$sSi1soiyS2i_SitFZ")).toBe("static Swift.Int.- infix(Swift.Int, Swift.Int) -> Swift.Int")
})
