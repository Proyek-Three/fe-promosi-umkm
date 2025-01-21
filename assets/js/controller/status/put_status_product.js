import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPUT, AmbilResponse } from "../config/url_put_product.js";
//import { urlPUT, AmbilResponse } from "../config/status/url_put_status.js";

function pushData() {
  let data = {
    status: {
      status: getValue("status"),
    },
  };

  console.log(data);

  const status = document.getElementById("status");

  if (status.value === "" || status.value === "Pilih Status") {
    alert("Harap memilih status terlebih dahulu");
  } else {
    postData(urlPUT, data, AmbilResponse)
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

// Pastikan ada elemen dengan id "button" di HTML dan menambahkan event listener yang benar
onClick("button", pushData);
