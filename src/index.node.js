// @ts-check
import { instantiate } from "../.build/plugins/PackageToJS/outputs/Package/instantiate.js"
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import { WASI } from "@bjorn3/browser_wasi_shim";

/** @type {import("./index.d").InitializeFn} */
export default async function initialize(options = {}) {
    let module = undefined;
    if (options.module) {
        module = options.module;
    } else {
        const pkgDir = path.dirname(fileURLToPath(import.meta.url))
        module = await WebAssembly.compile(new Uint8Array(await readFile(path.join(pkgDir, "swift-demangle.wasm"))));
    }
    const wasi = new WASI([], [], [], { debug: false })
    const { exports: { demangle } } = await instantiate({
        module,
        getImports() { return {} },
        wasi: Object.assign(wasi, {
            setInstance(instance) {
                wasi.inst = instance;
            },
        }),
    })
    return demangle
}
