let body = document.querySelector("body");
let header = document.querySelector("header");
let theme = document.querySelector("#theme");
// let p = document.querySelector("p");
let h1 = document.querySelector("h1");
let scrollDown = document.querySelector(".scrollDown");
let currTheme = "light";
theme.addEventListener("click", () => {
  if (currTheme === "light") {
    currTheme = "dark";
    body.classList.add("dark");
    header.classList.add("dark");
    h1.classList.add("dark");
    scrollDown.classList.add("dark");
    body.classList.remove("light");
    header.classList.remove("light");
    scrollDown.classList.remove("light");
    h1.classList.remove("light");
  } else {
    currTheme = "light";
    body.classList.add("light");
    header.classList.add("light");
    scrollDown.classList.add("light");
    h1.classList.add("light");
    body.classList.remove("dark");
    header.classList.remove("dark");
    scrollDown.classList.remove("dark");
    h1.classList.remove("dark");
  }
});
