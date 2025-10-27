// @ts-check
import { instantiate } from "../.build/plugins/PackageToJS/outputs/Package/instantiate.js"
import { WASI } from '@bjorn3/browser_wasi_shim';

/** @type {import("./index.d").InitializeFn} */
export default async function initialize(options = {}) {
    let module = undefined;
    if (options.module) {
        module = options.module;
    } else {
        module = fetch(new URL("swift-demangle.wasm", import.meta.url))
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
