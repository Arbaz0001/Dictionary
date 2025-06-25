const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const result = document.getElementById("result");
const toggle = document.getElementById("theme-toggle");
const fontSelect = document.getElementById("font-select");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = input.value.trim();
  if (!word) return;

  result.innerHTML = "Loading...";
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await res.json();

    if (data.title === "No Definitions Found") {
      result.innerHTML = `<p>No result found for <strong>${word}</strong></p>`;
    } else {
      const meaning = data[0];
      const phonetic = meaning.phonetic || "";
      const audio = meaning.phonetics?.find(p => p.audio)?.audio || "";

      let html = `<h2>${meaning.word}</h2><p><em>${phonetic}</em></p>`;
      if (audio) html += `<audio controls src="${audio}"></audio>`;

      meaning.meanings.forEach(m => {
        html += `<h3>${m.partOfSpeech}</h3><ul>`;
        m.definitions.forEach(d => {
          html += `<li>${d.definition}</li>`;
        });
        html += `</ul>`;
      });

      result.innerHTML = html;
    }
  }
   catch (err)  {
    result.innerHTML = `<p>Error fetching data. Please try again.</p>`;
   }
});

// Theme toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});

// Font select
fontSelect.addEventListener("change", () => {
  document.body.style.fontFamily = fontSelect.value;
});

