const compositions = [
    { id: 1, title: "Alphaville - Forever Young", file: "music/Alphaville - Forever Young.mp3" },
    { id: 2, title: "Aaron Smith - Dancin", file: "music/Aaron Smith - Dancin.mp3" },
    { id: 3, title: "Mazzy Star - Fade Into You", file: "music/Mazzy Star - Fade Into You.mp3" },
];

document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const results = compositions.filter(composition => composition.title.toLowerCase().includes(searchInput));
    const resultsContainer = document.getElementById('searchResults');

    if (results.length > 0) {
        resultsContainer.innerHTML = results.map(result => `
            <div>
                <p>${result.title}</p>
                <audio controls>
                    <source src="${result.file}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `).join('');
    } else {
        resultsContainer.innerHTML = '<div>Композицію не знайдено</div>';
    }
});
