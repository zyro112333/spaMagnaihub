import { titleFromKey, escapeHtml } from "../fn/format.js";
import { renderTable } from "../layouts/tableLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";
import { getImagesByFoodCode } from "../services/imageService.js";

/* Хайлтын үр дүнгийн хүснэгтийг харуулах хэсэг
items = хайгаад олсон хүнсний найрлагын json өгөгдөл
selectedTypes = ["proximates", "minerals", "vitamins" ...] */
export function renderNutritionTables(items, selectedTypes) {
  // Хайлтын үр дүн олдохгүй бол анхааруулах мессеж харуулна.
  if (!items.length) {
    return renderNotification("No match found.");
  }

  // Ямар нэгэн шим тэжээлийн төрлийг сонгоогүй бол анхааруулах мессеж харуулна.
  if (!selectedTypes.length) {
    return renderNotification("Please select at least one nutrition category.");
  }

  // Сонгосон шим тэжээлийн төрлүүдээр хүснэгт үүсгэнэ. proximates, minerals, vitamins ...
  return selectedTypes.map((type) => renderTableByType(type, items)).join("");
}

/* items = хайгаад олсон хүнсний найрлагын (json) өгөгдлүүдийг
type = Сонгосон шим тэжээлийн төрлүүдээр (proximates, minerals, vitamins ...) хүснэгт үүсгэнэ. */
function renderTableByType(type, items) {
  // description сонгосон бол тайлбар харуулах хүснэгт үүсгэнэ. Учир нь талбарууд өөр.
  if (type === "description") {
    return renderTable({
      title: "Description",
      columns: [
        { key: "food_name", label: "Food name" },
        { key: "food_group", label: "Food group" },
        { key: "scientific_name", label: "Scientific name" },
        { key: "native_name", label: "Native name" },
        { key: "province", label: "Province" },
      ],
      rows: items,
    });
  }

  // images сонгосон бол зураг харуулах хүснэгт үүсгэнэ. Учир нь талбарууд өөр. Food name:"Barley flour, whole grain", Number of Images: "4"
  if (type === "images") {
    return renderTable({
      title: "Images",
      columns: [
        {
          key: "food_name",
          label: "Food name",
        },
        {
          key: "number_of_images",
          label: "Number of Images",
          render: (item) => {
            const images = getImagesByFoodCode(item.food_code);
            const count = images.length;

            return count > 0
              ? `
                <span
                  class="tag is-primary image-count-tag open-image-btn"
                  data-foodcode="${escapeHtml(item.food_code)}"
                  data-foodname="${escapeHtml(item.food_name)}"
                >
                  ${count}
                </span>
              `
              : "-";
          },
        },
      ],
      rows: items,
    });
  }

  /* items дотор байгаа JSON өгөгдлөөс
    1. тухайн type (proximates, minerals, vitamins гэх мэт)-ийн бүх key-үүдийг цуглуулах,
    2. түүгээр хүснэгтийн columns үүсгэх, 
    3. дараа нь мөр (rows) үүсгэх */

  /* 1. Бүх item дотор байгаа nutrients-ийн бүх key-үүдийг давхардалгүйгээр цуглуулж байна. Үүнд:
        items.flatMap(...) бол бүх item-ийн key-үүдийг нэг array болгоно. new Set(...) бол давхардлыг арилгана. 
        type = "vitamins" бол ["Vitamin A (μg)", "Thiamin (mg)", "Riboflavin (mg)", "Vitamin C (mg)", "Refuse (%)"] */

  const nutrientKeys = Array.from(
    new Set(
      items.flatMap((item) => {
        const data = item?.[type]; // type = "vitamins" бол item["vitamins"] болно. {"Vitamin A (μg)": 1, "Thiamin (mg)": 0.28, "Riboflavin (mg)": 0.11, "Vitamin C (mg)": 22.95, "Refuse (%)": 0.0}

        return data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : []; // Object.keys(data) бол key-үүдийг array болгож авна. ["Vitamin A (μg)", "Thiamin (mg)", "Riboflavin (mg)", "Vitamin C (mg)", "Refuse (%)"]
      }),
    ),
  );

  /* 2. Тухайн type-ийн бүх key-үүдээр хүснэгтийн columns үүсгэх талбарууд. Үүнд:
        [
          { key: "food_name", label: "Food name" },

          { key: "Vitamin A (μg)", label: "Vitamin A (μg)" },
          { key: "Thiamin (mg)", label: "Thiamin (mg)" },
        ] */

  const columns = [
    { key: "food_name", label: "Food name" },
    ...nutrientKeys.map((key) => ({
      key,
      label: key,
    })),
  ];

  /* 3. Мөр (rows) үүсгэх өгөгдөл Үүнд:
        [
          {
            food_name: "Barley flour, whole grain",
            "Vitamin A (μg)": 1,
            "Thiamin (mg)": 0.28,
          },
          {
            food_name: "Barley flour, whole grain, pearled",
            "Vitamin A (μg)": 1,
            "Thiamin (mg)": 0.421,
          },
        ]
   */

  const rows = items.map((item) => ({
    food_name: item.food_name,
    ...(item?.[type] && typeof item[type] === "object" ? item[type] : {}),
  }));

  return renderTable({
    title: titleFromKey(type),
    columns,
    rows,
  });
}

/* renderTable({
  title: "Vitamins",

  columns: [
    { key: "food_name", label: "Food name" },
     
    { key: "Vitamin A (μg)", label: "Vitamin A (μg)" },
    { key: "Thiamin (mg)", label: "Thiamin (mg)" },
  ],

  rows: [
    {
      food_name: "Barley flour, whole grain",
      "Vitamin A (μg)": 1,
      "Thiamin (mg)": 0.28,
    },
    {
      food_name: "Barley flour, whole grain, pearled",
      "Vitamin A (μg)": 1,
      "Thiamin (mg)": 0.421,
    },
  ],
}); */
