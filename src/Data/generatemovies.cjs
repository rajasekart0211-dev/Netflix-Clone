const fs = require("fs");

const API_KEY = "VdJ6Kd0OVBwnwBgxFluNVcYAgqYI5SwV505ADxCg";
const input = require("./movies.json");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchDetails(id) {

  const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${API_KEY}`;

  try {

    const res = await fetch(url);

    console.log("STATUS:", res.status);

    const data = await res.json();

    console.log("Fetched:", data.title || data.id);

    return data;

  } catch (e) {

    console.log("ERROR:", e);

    return null;
  }
}

async function run() {

  const output = {};

  for (const category of Object.keys(input.movies)) {

    console.log(`\n🔥 Processing: ${category}`);

    const movies = input.movies[category];
    const results = [];

    for (let i = 0; i < movies.length; i++) {

      const m = movies[i];

      console.log(`➡️ ${i + 1}/${movies.length} ID: ${m.id}`);

      const data = await fetchDetails(m.id);

      if (data && data.id) {

        results.push({
          id: data.id,
          title: data.title,
          posterLarge: data.poster || null,
          posterMedium: data.poster || null,
          description: data.plot_overview || "",
          year: data.year || null,
          trailer: data.trailer || null,
          genres: data.genre_names || [],
          runtime: data.runtime_minutes || null
        });

      }

      await delay(1200);
    }

    output[category] = results;
  }

  fs.writeFileSync(
    "./src/Data/movies-full.json",
    JSON.stringify(output, null, 2)
  );

  console.log("\n✅ DONE! movies-full.json created");
}

run();