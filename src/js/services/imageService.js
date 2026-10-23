
let imageMap = {};
let loadingPromise = null;

export async function loadImages() {
  if (Object.keys(imageMap).length > 0) {
    return imageMap;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const response = await fetch("./data/images.json");

    if (!response.ok) {
      throw new Error(
        `Failed to load images.json: ${response.status}`
      );
    }

    imageMap = await response.json();
    return imageMap;
  })();

  try {
    return await loadingPromise;
  } catch (error) {
    loadingPromise = null;
    throw error;
  }
}

export function getImagesByFoodCode(foodCode) {
  return imageMap[String(foodCode)] || [];
}
