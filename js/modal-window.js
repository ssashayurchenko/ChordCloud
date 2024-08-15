var modal = document.getElementById("myModal");

var btn = document.getElementById("openModal");

var span = document.getElementsByClassName("close")[0];

let registerForm = document.querySelector("#registerForm");

function closeModal() {
  modal.style.display = "none";
}

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  closeModal();
};
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

export { closeModal };
