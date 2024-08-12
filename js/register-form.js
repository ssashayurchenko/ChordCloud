let registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let login = event.target.elements.login.value;
  let password = event.target.elements.password.value;

  if (password.length < 5) {
    console.log("Your password must contain at least 5 characters.");
  }
  if (!login.includes(".com")) {
    console.log("Your login must contain the ending '.com'");
  }
  if (!login.includes("@")) {
    console.log("Your login must contain '@'");
  } else {
    console.log("Form was submitted");
    console.log(login);
    console.log(password);
  }
});
