import { closeModal } from "./modal-window.js";

const registerForm = document.querySelector("#registerForm");
const openModal = document.querySelector("#openModal");
const userNameDisplay = document.querySelector("#userNameContainer");
const myModal = document.querySelector("#myModal");

const savedUserName = localStorage.getItem("registeredUserName");

if (savedUserName) {
  userNameDisplay.innerHTML = `<div>${savedUserName}</div>`;
  userNameDisplay.style.display = "block";
  if (openModal) {
    openModal.style.display = "none";
  }
} else {
  userNameDisplay.style.display = "none";
}

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const login = event.target.elements.login.value;
  const password = event.target.elements.password.value;
  const userName = document.querySelector("#userName").value;

  const userNameCheck = document.getElementById("userNameCheck");
  const loginCheck = document.getElementById("loginCheck");
  const passwordCheck = document.getElementById("passwordCheck");

  loginCheck.innerHTML = "";
  passwordCheck.innerHTML = "";
  userNameCheck.innerHTML = "";

  const loginPattern = /^[a-z0-9]+([.-][a-z0-9]+)*@[a-z]+\.[a-z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[-@!#$?])[A-Za-z\d-@!#$?]+$/;
  const userNamePattern = /^\w+$/;

  if (!loginPattern.test(login)) {
    loginCheck.innerHTML =
      "<div>Your login is invalid. It should be in the format: example@domain.example</div>";
  } else if (!passwordPattern.test(password)) {
    passwordCheck.innerHTML = `
            <div>
                Your password is invalid. 
                It should include at least: one letter, one number, and one special character (@!#$?).
            </div>`;
  } else if (!userNamePattern.test(userName)) {
    userNameCheck.innerHTML = `<div>Your name is invalid. 
   Username can only include letters, numbers, and underscores.</div>`;
  } else {
    localStorage.setItem("registeredUserName", userName);

    myModal.style.display = "none";
    closeModal();
    alert(`Registration successful! ${userName} enjoy your music!`);
    if (openModal) {
      openModal.style.display = "none";
    }
    userNameDisplay.innerHTML = `<div>${userName}</div>`;
    userNameDisplay.style.display = "block";
  }
  registerForm.reset();
});
