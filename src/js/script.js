// Menu script
const hamb = document.querySelector(".hamb");
const menu = document.querySelector(".menu");
const main = document.querySelector(".main");

hamb.addEventListener("click", function (e) {
  e.preventDefault();
  hamb.classList.toggle("active");
  menu.classList.toggle("show");
});

// Scroll down script
const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", function () {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition >= 2) {
    header.classList.add("fix");
    main.classList.add("marginTop");
  } else {
    header.classList.remove("fix");
    main.classList.remove("marginTop");
  }

  const countProjects = document.querySelectorAll(".project").length;
  for (let i = 0; i < countProjects; i++) {
    windowWidth <= 992 ? isScrolledIntoView("project", i, windowHeight) : false;
  }
});

function isScrolledIntoView(element, index, windowHeight) {
  let elementSelected = document.getElementsByClassName(element)[index];
  let rect = elementSelected.getBoundingClientRect();
  let firstChild = document.getElementsByClassName("info")[index];

  if (rect.top + 180 < windowHeight && rect.bottom > headerHeight + 180) {
    firstChild.classList.add("hover");
  } else {
    firstChild.classList.remove("hover");
  }
}

// Smooth scroll
function scrollToElement(id) {
  const element = document.getElementById(id);
  const yOffset = -85;

  if (id == "top") {
    var y = 0;
  } else {
    var y = element.getBoundingClientRect().top + window.scrollY + yOffset;
  }

  if (hamb.classList.contains("active")) {
    hamb.classList.toggle("active");
    menu.classList.toggle("show");
  }

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}

// Copy email to Clipboard
function copyEmail() {
  const emailButton = document.getElementById("emailButton");
  const spanCopy = document.getElementById("spanCopy");
  const emailAddress = "hello@pedrolorandi.com";

  navigator.clipboard.writeText(emailAddress);
  spanCopy.classList.add("show");

  setTimeout(() => {
    spanCopy.classList.add("disappear");
  }, 400);

  setTimeout(() => {
    spanCopy.classList.remove("show");
    spanCopy.classList.remove("disappear");
  }, 700);
}
