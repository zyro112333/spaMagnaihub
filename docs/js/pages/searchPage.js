import { getNutritions } from "../services/nutritionService.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="box">
      <h2 class="title is-4">Search</h2>
      <p>Loading data...</p>
    </div>
  `;

  try {
    const nutritions = await getNutritions();

    app.innerHTML = `
      <div class="box">
        <h2 class="title is-4">Search</h2>
        <p class="mb-4">Loaded foods: <strong>${nutritions.length}</strong></p>

        <ul>
          ${nutritions
            .map(
              (item) => `
                <li>
                  <strong>${item.food_name}</strong>
                  (${item.food_code})
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
    `;
  } catch (error) {
    app.innerHTML = `
      <div class="box">
        <h2 class="title is-4">Search</h2>
        <p class="has-text-danger">Failed to load nutrition data.</p>
      </div>
    `;

    console.error(error);
  }
}

