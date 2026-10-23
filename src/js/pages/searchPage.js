<<<<<<< HEAD

import { getNutritions } from "../services/nutritionService.js";
import {
  loadImages,
} from "../services/imageService.js";

import {
  renderImageModal,
  bindImageModalEvents,
} from "../components/imageModal.js";

import {
  renderSidebarPageLayout,
} from "../layouts/sidebarPageLayout.js";

import {
  renderPageLayout,
} from "../layouts/pageLayout.js";

import {
  renderNotification,
} from "../layouts/notificationLayout.js";

import {
  buildFoodGroups,
  renderDefaultTables,
  initNutritionData,
  bindSearchEvents,
} from "../fn/foodSearchEvents.js";

import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";
import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";
=======
import { getNutritions } from "../services/nutritionService.js";
>>>>>>> f4b67f1603618890a58c8967fbec59195487868b

export async function renderSearchPage() {
  const app = document.getElementById("app");

<<<<<<< HEAD
  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading data..."),
  });

  try {
    const nutritionData = await getNutritions();

    // Зургийн мэдээллийг хүснэгт үүсгэхээс өмнө ачаална.
    await loadImages();

    initNutritionData(nutritionData);

    const groupedFoods = buildFoodGroups(nutritionData);

    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `
          ${renderSearchFoodName()}
          ${renderSearchSettings()}
          ${renderFoodGroupList(groupedFoods)}
        `,
        pageId: "search",
        pageTitle: "Food Composition Database",
        mainContent: `
          <div id="resultTbl">
            ${renderDefaultTables(nutritionData)}
          </div>
        `,
      }) + renderImageModal();

    bindSidebar();
    bindMenuListToggle();
    bindSearchEvents();
    bindImageModalEvents();
  } catch (error) {
    console.error("Failed to load nutrition data:", error);

    app.innerHTML = renderPageLayout({
      content: renderNotification(
        "Failed to load nutrition data.",
        "danger"
      ),
    });
  }
}
=======
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

>>>>>>> f4b67f1603618890a58c8967fbec59195487868b
