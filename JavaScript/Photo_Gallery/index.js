const input = document.getElementById("input");
const container = document.getElementById("container");

// Use a fresh Unsplash demo key
const ACCESS_KEY = "w_G8zDOJsh4s9cTzVNyy3D9M8q_3vRxVAIhx7Jx9Hgc";

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = input.value.trim();
    if (query !== "") {
      searchImages(query);
    }
  }
});

async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${ACCESS_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();

    container.innerHTML = "";

    if (data.results.length === 0) {
      container.innerHTML = `<p style="font-size: 1.5rem; color: red;">No images found for "${query}"</p>`;
      return;
    }

    data.results.forEach((photo) => {
      const imgContainer = document.createElement("div");
      imgContainer.className = "image-container";

      imgContainer.innerHTML = `
        <img src="${photo.urls.regular}" alt="${photo.alt_description || "Unsplash Image"}" />
        <a href="${photo.links.download}" download class="download-btn">
          <i class="fa-solid fa-download"></i>
        </a>
      `;

      container.appendChild(imgContainer);
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    container.innerHTML = `<p style="font-size: 1.5rem; color: red;">Something went wrong. Please try again later.</p>`;
  }
}
