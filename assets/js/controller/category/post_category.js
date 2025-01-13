import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../../config/category/url_post_category.js";

function pushData() {
  let data = {
    category_name: getValue("category_name"),
  };

  console.log(data);
  const category_name = document.getElementById("category_name"); 


  if (category_name.value === "") {
    alert("Harap pilih category terlebih dahulu");
  } else {
    
    postData(urlPOST, data, AmbilResponse)
      .then((response) => {
        if (response.ok) {
          alert("Data successfully saved!");
          document.getElementById("menu_form").reset();
        } else {
          alert("Terjadi kesalahan saat mengirim data.");
        }
      })
      .catch((error) => {
        alert("Terjadi kesalahan response: " + error.message);
      });
  }
}

onClick("button", pushData);