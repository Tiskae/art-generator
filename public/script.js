// DOM elements
const loaderEl = document.querySelector(".loader");
const artEl = document.querySelector(".art");
const generateNewArtBtn = document.querySelector(".generate-btn");

let artworkIds = [];

async function initializeApp() {
  try {
    // firstly, fetch all artwork ids
    const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=&hasImages=true");

    // res is in JSON format
    const data = await res.json(); // converts JSON to JS object
    const objIds = data.objectIDs;
    artworkIds = objIds;

    // load first artwork automatically
    generateAndLoadRandomArtwork();
  } catch (err) {
    console.log(err);
  }
}

async function generateAndLoadRandomArtwork() {
  // select an artwork id at random
  const artWorkIdsLength = artworkIds.length;
  const randomIdIndex = Math.round(Math.random() * artWorkIdsLength);
  const randomId = artworkIds[randomIdIndex];

  // load the data for the selected id
  try {
    // show the loader & make arts faded
    loaderEl.classList.remove("hidden");
    artEl.classList.add("dimmed");
    generateNewArtBtn.disabled = true;

    const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`);

    // res is in JSON format
    const artwork = await res.json(); // converts JSON to JS object

    // delete loaded artwork id from artworkIds
    artworkIds.splice(randomIdIndex, 1);

    // hide the loader & make arts visible
    loaderEl.classList.add("hidden");
    artEl.classList.remove("dimmed");
    generateNewArtBtn.disabled = false;

    // display the loaded data
    const artImg = artwork.primaryImage;
    const title = artwork.title;
    const artistDisplayName = artwork.artistDisplayName;
    const artistBio = artwork.artistDisplayBio;
    const department = artwork.department;
    const culture = artwork.culture;
    const accessionYear = artwork.accessionYear;
    const dimensions = artwork.dimensions;
    const creditLine = artwork.creditLine;
    const city = artwork.city;
    const country = artwork.country;
    const region = artwork.region;
    const authorWikiUrl = artwork.artistWikidata_URL;

    const artInfosHTML = `
        <img class="art-image" src="${artImg}" alt="Image of ${title}" />

        <div class="art-infos">
          <h2 class="art-title">${title}</h2>
          ${artistDisplayName ? `<p class="art-info">Artist Name: ${artistDisplayName}</p>` : ""}
          ${artistBio ? `<p class="art-info">Artist Bio: ${artistBio}</p>` : ""}
          <p class="art-info">Department: ${department}</p>
          ${culture ? `<p class='art-info'>Culture: ${culture}</p>` : ""}
          ${accessionYear ? `<p class='art-info'>Accession Year: ${accessionYear}</p>` : ""}
          ${dimensions ? `<p class='art-info'>Dimensions: ${dimensions}</p>` : ""}
          ${creditLine ? `<p class='art-info'>Credit Line: ${creditLine}</p>` : ""}
          ${city ? `<p class='art-info'>City: ${city}</p>` : ""}
          ${country ? `<p class='art-info'>Country: ${country}</p>` : ""}
          ${region ? `<p class='art-info'>Region: ${region}</p>` : ""}
          ${
            authorWikiUrl ? `<a class='art-info' href=${authorWikiUrl} target="_blank">Learn more about author</a>` : ""
          }
        </div>`;

    artEl.innerHTML = artInfosHTML;
  } catch (err) {
    console.log(err);
  }
}

initializeApp();
generateNewArtBtn.addEventListener("click", () => {
  generateAndLoadRandomArtwork();
});
