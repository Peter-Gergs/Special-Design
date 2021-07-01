// Start settings box
let settingsIcon = document.querySelector("header .container .settings-icon");
let settingsBox = document.querySelector(".settings-box");
let exitIcon = document.getElementById("exit");
function toggleSettings() {
  this.classList.toggle("fa-spin");
  settingsBox.classList.toggle("open");
}
settingsIcon.addEventListener("click", toggleSettings);
exitIcon.addEventListener("click", () => {
  settingsBox.classList.remove("open");
  settingsIcon.classList.remove("fa-spin");
});
// Setting Color Option
const colorLi = document.querySelectorAll(
  ".settings-box .settings-container .option-box .colors-list li"
);
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    localStorage.setItem("color-option", e.target.dataset.color);
    removeActiveClasses(colorLi);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    e.target.classList.add("active");
  });
});
function removeActiveClasses(array) {
  array.forEach((element) => {
    element.classList.remove("active");
  });
}
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  let colorArr = [];
  for (let i = 0; i < colorLi.length; i++) {
    let licolor = colorLi[i].dataset.color;
    colorArr.push(licolor);
  }
  for (let i = 0; i < colorArr.length; i++) {
    if (mainColor === colorArr[i]) {
      removeActiveClasses(colorLi);
      colorLi[i].classList.add("active");
    }
  }
}
// Setting Autobackground Option

let backgroundInterval;
function automateIamges() {
  if (backGroundOption === true) {
    backgroundInterval = setInterval(() => {
      if (currentSlide < 5) {
        currentSlide += 1;
        theChecker();
      } else {
        currentSlide = 1;
        theChecker();
      }
    }, 5000);
  }
}
const automateBackground = document.querySelectorAll(
  ".settings-box .settings-container .option-box:nth-of-type(2) .btns button"
);
automateBackground.forEach((Btn) => {
  Btn.addEventListener("click", (e) => {
    removeActiveClasses(e.target.parentElement.querySelectorAll(".active"));
    e.target.classList.add("active");
    if (e.target.dataset.background === "yes") {
      backGroundOption = true;
      automateIamges();
      localStorage.setItem("background-option", true);
    } else {
      backGroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
let backgroundLoacalItem = localStorage.getItem("background-option");
let backGroundOption = false;
if (backgroundLoacalItem !== null) {
  removeActiveClasses(automateBackground);
  backgroundLoacalItem === "true"
    ? (backGroundOption = true) &
      document.querySelector(".btns .yes").classList.add("active")
    : (backGroundOption = false) &
      document.querySelector(".btns .no").classList.add("active");
}
automateIamges();

// Bullets option
let bulletsButton = document.querySelectorAll(
  ".settings-box .settings-container .option-box:nth-of-type(3) .btns button"
);
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItems = localStorage.getItem("bullets-option");
if (bulletsLocalItems !== null) {
  removeActiveClasses(bulletsButton);
  if (bulletsLocalItems === "show") {
    bulletsContainer.style.opacity = "1";
    bulletsContainer.style.display = "block";
    document
      .querySelector(".option-box:nth-of-type(3) .btns .yes")
      .classList.add("active");
  } else {
    bulletsContainer.style.opacity = "0";
    bulletsContainer.style.display = "none";
    document
      .querySelector(".option-box:nth-of-type(3) .btns .no")
      .classList.add("active");
  }
}
bulletsButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (btn.dataset.bullets == "show") {
      bulletsContainer.style.display = "block";
      setTimeout(() => {
        bulletsContainer.style.opacity = "1";
      }, 100);
      localStorage.setItem("bullets-option", "show");
    } else {
      bulletsContainer.style.opacity = "0";
      setTimeout(() => {
        bulletsContainer.style.display = "none";
      }, 500);
      localStorage.setItem("bullets-option", "hide");
    }
    removeActiveClasses(e.target.parentElement.querySelectorAll(".active"));
    e.target.classList.add("active");
  });
});
// Reset options
let resetBtn = document.querySelector(".reset-options");
resetBtn.onclick = function () {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};
// End settings
// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu"),
  thelinks = document.querySelector("header .links");
toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("menu-active");
  thelinks.classList.toggle("open");
});
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("menu-active") ||
    e.target.classList.contains("open")
  ) {
    return false;
  } else {
    toggleBtn.classList.remove("menu-active");
    thelinks.classList.remove("open");
  }
});
thelinks.onclick = function (e) {
  e.stopPropagation();
};
// Start Landing Page
let landingPage = document.querySelector(".landing");
let slider = document.querySelector("#slider");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let currentSlide = 3;
function nextSlide() {
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide += 1;
    theChecker();
  }
}
function prevSlide() {
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide -= 1;
    theChecker();
  }
}
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
function theChecker() {
  if (currentSlide === 5) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
  if (currentSlide === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  if (currentSlide === 1) {
    slider.style.transform = "translateX(200%)";
  } else if (currentSlide === 2) {
    slider.style.transform = "translateX(100%)";
  } else if (currentSlide === 3) {
    slider.style.transform = "translateX(0%)";
  } else if (currentSlide === 4) {
    slider.style.transform = "translateX(-100%)";
  } else if (currentSlide === 5) {
    slider.style.transform = "translateX(-200%)";
  }
}
// End landing Page
// Start skills
window.onscroll = function () {
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  let skillBox = document.querySelectorAll(".skills .container .skills-box");
  let allSkills = document.querySelectorAll(
    ".skills .container .skills-box .skill-progress span"
  );
  for (let i = 0; i < skillBox.length; i++) {
    let box = skillBox[i];
    let boxOffsetTop = box.offsetTop;
    let boxOuterHeight = box.offsetHeight;
    if (windowScrollTop > boxOffsetTop + boxOuterHeight - windowHeight) {
      allSkills[i].style.width = allSkills[i].dataset.progress;
    } else {
      allSkills[i].style.width = 0;
    }
  }
};
// End skills
// Start Gallery
let ourGallery = document.querySelectorAll(".images-container img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div"); // create popup
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay); // append popup to body
    let popupBox = document.createElement("div"); //create popup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3"); //create heading
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText); // append text to heading
      popupBox.appendChild(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    let closeBtn = document.createElement("i");
    closeBtn.classList.add("fas", "fa-times", "close-img"); // add classes to Btn
    popupBox.appendChild(closeBtn);
    setTimeout(() => (popupBox.style.opacity = "1"), 10);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-img")) {
    document.querySelector(".popup-box").style.opacity = "0";
    setTimeout(function () {
      document.querySelector(".popup-box").remove();
      document.querySelector(".popup-overlay").remove();
    }, 500);
  }
});
// End Gallery
// navigtion bullet
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// text area letters numbers
let textArea = document.querySelector("#message");
let numbersSpan = document.querySelector("#letternums");
let lettersNums = 150 - textArea.value.length;
setInterval(() => {
handleLetters();

}, 10)
textArea.addEventListener("keypress", () => {
handleLetters()
});
document.querySelector('input[type="submit"]').onclick = function (e) {
  if (lettersNums < 0) {
    e.preventDefault();
    window.alert(`Message must be less 150 Characters`);
  }
};
function handleLetters() {
  lettersNums = 150 - textArea.value.length;
  numbersSpan.textContent = `Characters left: ${lettersNums}`;
  lettersNums < 0
    ? (numbersSpan.style.color = "red")
    : (numbersSpan.style.color = "#666");
}
