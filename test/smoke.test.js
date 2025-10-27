import init from "../dist"
import { test, expect } from "vitest"

test("smoke check on Node.js", async () => {
    const demangle = await init()
    expect(demangle("$sSi1soiyS2i_SitFZ")).toBe("static Swift.Int.- infix(Swift.Int, Swift.Int) -> Swift.Int")
})
