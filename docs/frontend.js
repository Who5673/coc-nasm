// WebAssembly and frontend.js
Module.onRuntimeInitialized = () => {
  const returnformat = Module.cwrap('returnformat', 'string', ['string']);
  const result2 = returnformat("Hello from WebAssembly!");
  console.log(result2);
  let current_background = returnformat("dark");

  /* Static scripts */
  const backgroundmode = document.getElementById("light");
  const menu = document.getElementsByTagName("nav")[0];
  backgroundmode.addEventListener("click", () => {
    switch (current_background) {
      case "dark":
        document.getElementById("bodie").classList.add("light");
        menu.classList.add("light");
        current_background = returnformat("light");
        break;
      default:
        document.getElementById("bodie").classList.remove("light");
        menu.classList.remove("light");
        current_background = returnformat("dark");
        break;
    }
  });

  /* Get the boxes in Home */
  document.getElementById("getlinknow1").addEventListener("click", () => {
    window.location.href = "installation_for_coc.html";
  });
  document.getElementById("getlinknow2").addEventListener("click", () => {
    window.location.href = "installation_for_nvim.html";
  });


  /* Getlink in Home */
  let getlinknow3, getlinknow4, getlinknow5, getlinknow6;
  copystatus = document.getElementsByClassName("c2");
  getlinknow3 = document.getElementById("getlinknow3");
  getlinknow6 = document.getElementById("getlinknow6");
  getlinknow4 = document.getElementById("getlinknow4");
  getlinknow5 = document.getElementById("getlinknow5");
  
  getlinknow6.addEventListener("click", () => {
    window.location.href = "fake_document.html";
  });
}