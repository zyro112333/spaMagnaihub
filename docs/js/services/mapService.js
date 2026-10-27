// SVG газрын зургийг ачаалах
export async function loadMapSvg() {
  const response = await fetch("./img/map.svg");

  if (!response.ok) {
    throw new Error("Failed to load map.svg");
  }

  return await response.text();
}

// Аймгийн нэрээр food data шүүх
export function getFoodsByProvince(nutritionData, provinceNameEn) {
  if (!Array.isArray(nutritionData)) return [];

  return nutritionData.filter((item) => {
    const province = typeof item.province === "object" ? item.province?.en : item.province;

    return province === provinceNameEn;
  });
}
