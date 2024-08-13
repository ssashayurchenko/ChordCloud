let registerForm = document.querySelector("#registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let login = event.target.elements.login.value;
  let password = event.target.elements.password.value;

  const loginContainer = document.getElementById("loginCheck");
  const passwordContainer = document.getElementById("passwordCheck");

  loginContainer.innerHTML = "";
  passwordContainer.innerHTML = "";

  const loginPattern = /^[a-z]+([.-][a-z]+)*@[a-z]+\.[a-z]{2,}$/;
  const passwordPattern = /\w+[0-9]+[@!#$?]/;

  if (!loginPattern.test(login)) {
    loginContainer.innerHTML =
      "<div>Your login is invalid. It should be in the format: example@domain.example</div>";
  } else if (!passwordPattern.test(password)) {
    passwordContainer.innerHTML = `
        <div>
    Your password is invalid. 
    It should include at least: one letter, one number, and one special character (@!#$?).
    </div>`;
  } else {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }
});
