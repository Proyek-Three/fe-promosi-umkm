import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post_product.js";

function pushData() {
  let data = {
    productname: getValue("product_name"),
    price: parseFloat(getValue("price")),
    description: getValue("description"),
    image: getValue("image"),
    category: {
        category_name: getValue("category_name"),
    },
    status: {
      status: getValue("status"),
    },
  };

  console.log(data);
  const productname = document.getElementById("product_name"); //mengambil value dari input dengan id nama
  const price = document.getElementById("price"); 
  const description = document.getElementById("description");
  const image = document.getElementById("image");
  const category = document.getElementById("category_name");
  const status = document.getElementById("status");

  if (productname.value === "") {
    alert("Harap Masukan data produk terlebih dahulu");
  } else if (price.value === "") {
    alert("Harap Masukan harga produk terlebih dahulu");
  } else if (description.value === "") {
    alert("Harap Masukan deskripsi produk terlebih dahulu");
  } else if (image.value === "") {
    alert("Harap Masukan gambar produk terlebih dahulu");
  } else if (category.value === "" || category.value === "Pilih Kategori") {
    alert("Harap memilih kategori produk terlebih dahulu");
  } else if (status.value === "" || status.value === "Pilih Status") {
    alert("Harap memilih status terlebih dahulu");
  } else if (storename.value === "") {
    alert("Harap Masukan nama toko terlebih dahulu");
  } else if (address.value === "") {
    alert("Harap Masukan alamat toko terlebih dahulu");
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