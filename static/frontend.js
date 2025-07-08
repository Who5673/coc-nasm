const {log} = require("console");

// frontend.js
Module.onRuntimeInitialized = () => {
  const returnformat = Module.cwrap('returnformat', 'string', ['string']);
  const result2 = returnformat("Hello from WebAssembly!");
  console.log(result2);
}
