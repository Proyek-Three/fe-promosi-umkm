fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product")
  .then((response) => response.json())
  .then((products) => {
    const acceptedProducts = products.filter(
      (product) => product.status.status === "Accepted"
    );
    const productContainer = document.getElementById("product-container");

    acceptedProducts.forEach((product) => {
      const productElement = `
        <div
          class="bg-white rounded-lg shadow-lg p-8 product-item"
          data-category="${product.category.category_name.toLowerCase()}" 
          data-name="${product.product_name}"
          data-store="${product.user.store.store_name}"
          data-price="Rp. ${product.price.toLocaleString()}"
          data-description="${product.description}"
          data-address="${product.user.store.store_name}"
        >
          <img
            class="object-cover w-full h-48 rounded-t-lg"
            src="${product.image}"
            alt="${product.product_name}"
          />
          <h3 class="text-xl font-bold text-gray-900 mt-4">
            ${product.product_name}
          </h3>
          <h4 class="text-gray-500 font-bold text-sm mt-2">
            Rp. ${product.price.toLocaleString()}
          </h4>
          <p class="text-gray-500 text-sm text-justify mt-2">
            ${product.description}
          </p>
          <button
            type="button"
            class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onclick="showModal(this)"
          >
            Product Details
          </button>
        </div>
      `;
      productContainer.innerHTML += productElement;
    });
  })
  .catch((error) => console.error("Error fetching products:", error));

function showModal(button) {
  // Ambil elemen item produk terdekat
  const productItem = button.closest(".product-item");

  // Ambil data dari atribut data-*
  const productName = productItem.dataset.name;
  const productImage = productItem.querySelector("img").src;
  const storeName = productItem.dataset.store;
  const price = productItem.dataset.price;
  const description = productItem.dataset.description;
  const address = productItem.dataset.address;

  // Isi data ke dalam modal
  document.getElementById("modalProductName").textContent = productName;
  document.getElementById("modalProductImage").src = productImage;
  document.getElementById("modalStoreName").textContent = storeName;
  document.getElementById("modalPrice").textContent = price;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalAddress").textContent = address;

  // Tampilkan modal
  const modal = document.getElementById("productModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.classList.remove("scale-95");
  modal.classList.add("scale-100");
}

function closeModal() {
  // Sembunyikan modal
  const modal = document.getElementById("productModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modal.classList.add("scale-95");
  modal.classList.remove("scale-100");
}
