// -----------------------------------------nevigation menu--------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector("#bar");
  const rightbarLinks = document.querySelector(".rightbarLinks");
  bar.addEventListener("click", () => {
    event.stopPropagation();
    if (rightbarLinks.style.display === "none") {
      rightbarLinks.style.display = "flex";
    } else {
      rightbarLinks.style.display = "none";
    }
    document.addEventListener("click", () => {
      rightbarLinks.style.display = "none";
    });
    document.addEventListener("click", () => {
      rightbarLinks.style.display = "none";
    });
    rightbarLinks.addEventListener("click", () => {
      event.stopPropagation();
    });
  });
});
