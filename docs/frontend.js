// WebAssembly and frontend.js
Module.onRuntimeInitialized = () => {
  const returnformat = Module.cwrap('returnformat', 'string', ['string']);
  const result2 = returnformat("Hello from WebAssembly!");
  console.log(result2);
  let current_background = returnformat("dark");

  /* Static scripts */
  const backgroundmode = document.getElementById("light");
  backgroundmode.addEventListener("click", () => {
    switch (current_background) {
      case "dark":
        document.getElementById("bodie").classList.add("light");
        current_background = returnformat("light");
        break;
      default:
        document.getElementById("bodie").classList.remove("light");
        current_background = returnformat("dark");
        break;
    }
  });

  /* JavaScript Copy Clipboard */
  let cpclipbd = document.querySelectorAll(".c2");
  cpclipbd.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const code = document.querySelectorAll(".codeblock")[idx].textContent;
      let cpresult = navigator.clipboard.writeText(code);
      cpresult.then(() => alert("Copied")).catch(() => alert("Error while copying"));
    });
  });
}
