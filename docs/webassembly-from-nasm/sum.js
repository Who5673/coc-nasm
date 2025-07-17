export async function loadWasm() {
    // Load WebAssembly normal functions:
    const response = await fetch("sum.wasm");
    const bytes = await response.arrayBuffer();
    const result = await WebAssembly.instantiate(bytes);
    return result.instance;
}
