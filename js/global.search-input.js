const response = await fetch("api/songs-list.json");
const compositions = await response.json();

function search() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const results = compositions.filter((composition) =>
    composition.title.toLowerCase().includes(searchInput)
  );
  const resultsContainer = document.getElementById("searchResults");

  if (results.length > 0) {
    resultsContainer.innerHTML = results
      .map(
        (result) => `
                <div> 
                    <p>${result.title}</p>
                    <audio controls>
                        <source src="${result.file}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            `
      )
      .join("");
  } else {
    resultsContainer.innerHTML = "<div>No composition found</div>";
  }
}

document.getElementById("searchButton").addEventListener("click", search);

document.getElementById("searchInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
    event.preventDefault(); 
  }
});
