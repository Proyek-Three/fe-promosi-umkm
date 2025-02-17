fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product")
  .then((response) => response.json())
  .then((products) => {
    return fetch(
      "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/productnumber"
    )
      .then((response) => response.json())
      .then((phoneNumbers) => {
        console.log("Fetched phone numbers:", phoneNumbers);
        const phoneMap = new Map();
        phoneNumbers.forEach((phone) => {
          phoneMap.set(phone._id, phone.phone_number);
        });

        const acceptedProducts = products.filter(
          (product) => product.status && product.status.status === "Accepted"
        );
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Clear previous content

        acceptedProducts.forEach((product) => {
          console.log("Processing product:", product);

          const productId = product.id;
          console.log("Looking for phone number with product ID:", productId);

          const phoneNumber = productId
            ? phoneMap.get(productId) || "N/A"
            : "N/A";
          console.log("Assigned phone number:", phoneNumber);

          const productElement = `
          <div
            class="bg-white rounded-xl shadow-lg p-6 product-item hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 border border-gray-200"
            data-category="${
              product.category
                ? product.category.category_name.toLowerCase()
                : "Unknown"
            }"
            data-name="${product.product_name}"
            data-store="${product.user?.store?.store_name || "Unknown"}"
            data-phone="${phoneNumber}"
            data-price="Rp. ${
              product.price ? product.price.toLocaleString() : "0"
            }"
            data-description="${product.description}"
            data-address="${
              product.user?.store?.address ||
              product.user?.store?.store_address ||
              "Unknown address"
            }"
          >
            <!-- Product Image -->
            <div class="relative">
              <img class="object-cover w-full h-52 rounded-xl shadow-md" src="${
                product.image
              }" alt="${product.product_name}" />
              <span class="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-1 text-xs font-bold rounded-lg shadow-md">
                ${
                  product.category
                    ? product.category.category_name
                    : "No Category"
                }
              </span>
            </div>
        
            <!-- Product Info -->
            <div class="mt-4">
              <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                <i class="fas fa-box mr-2 text-purple-600"></i> ${
                  product.product_name
                }
              </h2>
        
              <h3 class="text-gray-600 font-bold text-md mt-2 flex items-center">
                <i class="fas fa-tag text-green-500 mr-2"></i> Rp. ${
                  product.price ? product.price.toLocaleString() : "0"
                }
              </h3>
              
              <!-- Product Description -->
              <p class="text-gray-700 mt-3 text-sm flex items-center">
                <i class="fas fa-info-circle text-blue-500 mr-2"></i> 
                ${
                  product.description
                    ? product.description
                    : "No description available."
                }
              </p>
        
              <!-- Button -->
              <button
                type="button"
                class="mt-4 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-6 py-3 text-center transition-transform transform hover:scale-105"
                onclick="showModal(this)"
              >
                <i class="fas fa-info-circle"></i> Product Details
              </button>
            </div>
          </div>
        `;

          productContainer.innerHTML += productElement;
        });
      });
  })
  .catch((error) => console.error("Error fetching products:", error));

function showModal(button) {
  const productItem = button.closest(".product-item");
  const productName = productItem.dataset.name;
  const productImage = productItem.querySelector("img").src;
  const storeName = productItem.dataset.store;
  const phoneNumber = productItem.dataset.phone;
  const price = productItem.dataset.price;
  const description = productItem.dataset.description;
  const address = productItem.dataset.address;
  console.log("Address in modal:", address); // Debug

  document.getElementById("modalProductName").textContent = productName;
  document.getElementById("modalProductImage").src = productImage;
  document.getElementById("modalStoreName").textContent = storeName;
  document.getElementById("modalPrice").textContent = price;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalAddress").textContent =
    address || "Alamat tidak tersedia";

  // Menangani tombol WhatsApp
  const modalPhoneButton = document.getElementById("modalPhoneButton");

  if (phoneNumber !== "N/A") {
    let cleanPhoneNumber = phoneNumber.replace(/\D/g, ""); // Hapus semua karakter selain angka

    // Jika nomor diawali dengan 0, ubah menjadi 62
    if (cleanPhoneNumber.startsWith("0")) {
      cleanPhoneNumber = "62" + cleanPhoneNumber.substring(1);
    }

    modalPhoneButton.href = `https://wa.me/${cleanPhoneNumber}`;
    modalPhoneButton.classList.remove("hidden"); // Tampilkan tombol jika ada nomor
  } else {
    modalPhoneButton.href = "#";
    modalPhoneButton.classList.add("hidden"); // Sembunyikan tombol jika nomor tidak tersedia
  }

  const modal = document.getElementById("productModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.classList.remove("scale-95");
  modal.classList.add("scale-100");
}

console.log("Store Info:", product.user?.store);
