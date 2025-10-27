import { ModuleSource } from "./.build/plugins/PackageToJS/outputs/Package/instantiate"

export type Demangler = (mangledName: string) => string
export type ModuleSource = WebAssembly.Module | ArrayBufferView | ArrayBuffer | Response | PromiseLike<Response>
export type InitializeOptions = {
    /**
     * The WebAssembly module source to instantiate
     */
    module?: ModuleSource
}
export type InitializeFn = (options?: InitializeOptions) => Promise<Demangler>
const initialize: InitializeFn;
export default initialize;