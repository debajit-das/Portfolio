let body = document.querySelector("body");
let header = document.querySelector("header");
let theme = document.querySelector("#theme");
// let name = document.querySelector("#name");
// let p = document.querySelector("p");
let h1 = document.querySelector("h1");
let scrollDown = document.querySelector(".scrollDown");
// let logo = document.querySelector(".logo");
let logo = document.getElementsByClassName("logo");
let currTheme = "light";
let currLogo = "lightLogo";
theme.addEventListener("click", () => {
  if (currTheme === "light") {
    currTheme = "dark";
    body.classList.add("dark");
    // name.classList.add("dark");
    header.classList.add("dark");
    h1.classList.add("dark");
    // scrollDown.classList.add("dark");
    // logo.classList.add("darkLogo");
    body.classList.remove("light");
    // name.classList.remove("light");
    header.classList.remove("light");
    // scrollDown.classList.remove("light");
    h1.classList.remove("light");
    // logo.classList.remove("lightLogo");
  } else {
    currTheme = "light";
    body.classList.add("light");
    // name.classList.add("light");
    // header.classList.add("light");
    // scrollDown.classList.add("light");
    h1.classList.add("light");
    // logo.classList.add("lightLogo");
    body.classList.remove("dark");
    // name.classList.remove("dark");
    header.classList.remove("dark");
    // scrollDown.classList.remove("dark");
    h1.classList.remove("dark");
    // logo.classList.remove("darkLogo");
  }
});
theme.addEventListener("click", () => {
  if (currLogo === "lightLogo") {
    currLogo = "darkLogo";
    logo.classList.add("darkLogo");
    logo.classList.remove("lightLogo");
  } else {
    currLogo = "lightLogo";
    logo.classList.add("lightLogo");
    logo.classList.remove("darkLogo");
  }
});
