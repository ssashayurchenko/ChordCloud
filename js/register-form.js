const registrationModal = document.getElementById("registrationModal");
const openModal = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];
const closeModal = document.querySelector("#closeModal");
const logOutModal = document.querySelector("#logOutModal");
const yesBtn = document.querySelector("#yesBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const userNameDisplay = document.querySelector("#userNameContainer");
const registerForm = document.querySelector("#registerForm");

function closeModalWindow() {
  registrationModal.style.display = "none";
}

openModal.onclick = function () {
  registrationModal.style.display = "block";
};

span.onclick = function () {
  closeModalWindow();
};

function showModal() {
  logOutModal.style.display = "block";
  yesBtn.onclick = function () {
    logOutModal.style.display = "none";
    closeModal.style.display = "none";
    openModal.style.display = "block";
    userNameDisplay.style.display = "none";
    localStorage.removeItem("registeredUserName");
    localStorage.removeItem("favorites"); // Clear favorites on logout
    window.location.reload();
  };
  cancelBtn.onclick = function () {
    logOutModal.style.display = "none";
    openModal.style.display = "none";
    userNameDisplay.style.display = "block";
  };
}
logOutModal.style.display = "none";

const savedUserName = localStorage.getItem("registeredUserName");

if (savedUserName) {
  userNameDisplay.innerHTML = `<div>${savedUserName}</div>`;
  userNameDisplay.style.display = "block";
  closeModal.style.display = "block";
  openModal.style.display = "none";
} else {
  closeModal.style.display = "none";
  userNameDisplay.style.display = "none";
}

closeModal.addEventListener("click", showModal);

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
    userNameCheck.innerHTML = `<div>The username can only contain English letters, numbers, and underscores.</div>`;
  } else {
    localStorage.setItem("registeredUserName", userName);
    registrationModal.style.display = "none";
    closeModalWindow();
    alert(`Registration successful! ${userName} enjoy your music!`);
    window.location.reload();
    openModal.style.display = "none";
    userNameDisplay.innerHTML = `<div>${userName}</div>`;
    userNameDisplay.style.display = "block";
    closeModal.style.display = "block";
  }
});

export { savedUserName };
