
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

export async function renderSearchPage() {
  const app = document.getElementById("app");

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
