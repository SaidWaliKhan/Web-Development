async function fetchData() {
    const name = document.getElementById("name").value.trim().toLowerCase();
    const img = document.getElementById("image");
    const loader = document.getElementById("loader");
    const error = document.getElementById("error");

    img.style.display = "none";
    error.style.display = "none";
    loader.style.display = "block";

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Pokémon not found");

        const data = await res.json();
        img.src = data.sprites.front_default;
        img.style.display = "block";
    } catch (err) {
        error.style.display = "block";
        console.error(err);
    } finally {
        loader.style.display = "none";
    }
}

function retry() {
    document.getElementById("error").style.display = "none";
    document.getElementById("name").focus();
}
