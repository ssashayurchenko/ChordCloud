const modal = document.getElementById("myModal");

const btn = document.getElementById("openModal");

const span = document.getElementsByClassName("close")[0];

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
