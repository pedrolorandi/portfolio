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
    isScrolledIntoView("project", i, windowHeight);
  }
});

// Auto hover on project info
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
  messageAnimation(spanCopy);
}

// Message animation
function messageAnimation(element) {
  let time,
    reset = 0;

  if (element === document.getElementById("spanCopy")) {
    time = 400;
    reset = 700;
  } else {
    time = 2500;
    reset = 2600;
  }
  element.classList.remove("sending");
  element.classList.add("show");

  setTimeout(() => {
    element.classList.add("disappear");
  }, time);

  setTimeout(() => {
    element.classList.remove("show");
    element.classList.remove("disappear");
  }, reset);
}

// Form submit
const contactForm = document.getElementById("contactForm");
const formSubmit = document.getElementById("formSubmit");
const formName = document.getElementById("formName");
const formEmail = document.getElementById("formEmail");
const formSubject = document.getElementById("formSubject");
const formMessage = document.getElementById("formMessage");
const spanMessage = document.getElementById("spanMessage");

formSubmit.addEventListener("click", function (e) {
  let formData = {
    name: formName.value,
    email: formEmail.value,
    subject: formSubject.value,
    message: formMessage.value,
  };

  let contactInputs = contactForm.elements;

  for (i = 0; i < contactInputs.length; i++) {
    if (contactInputs[i].validity.valid) {
      contactInputs[i].classList.remove("not-valid");
    } else {
      contactInputs[i].classList.add("not-valid");
      return;
    }
  }

  spanMessage.classList.add("show");
  spanMessage.classList.add("sending");
  spanMessage.innerHTML = "Sending message...";

  $.ajax({
    type: "POST",
    url: "https://formspree.io/f/xjvljllq",
    data: formData,
    dataType: "JSON",
  })
    .done(function () {
      contactForm.reset();
      spanMessage.innerHTML = "Thanks, I'll get back to you soon!";
      messageAnimation(spanMessage);
      contactForm.reset();
    })
    .fail(function () {
      spanMessage.classList.remove("sending");
      spanMessage.classList.add("wrong");
      spanMessage.innerHTML = "Please, try again later. I'm sorry!";
      contactForm.reset();

      for (i = 0; i < contactInputs.length; i++) {
        contactInputs[i].disabled = true;
        contactInputs[i].placeholder = "";
        contactInputs[i].classList.add("disabled");
      }
    });

  e.preventDefault();
});
