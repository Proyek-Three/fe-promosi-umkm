// Ambil elemen container produk
const productContainer = document.getElementById("product-container");

// Fungsi untuk mengambil data produk dari API
async function fetchProducts() {
  try {
    const response = await fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();

    // Bersihkan container produk sebelum menambahkan data baru
    productContainer.innerHTML = "";

    // Iterasi setiap produk dan tambahkan ke dalam container
    products.forEach((product) => {
      const productCard = `
        <div
          class="bg-white rounded-lg shadow-lg p-8 product-item"
          data-category="${product.category.category_name.toLowerCase()}" 
          data-name="${product.product_name}"
          data-store="${product.store.store_name}"
          data-price="Rp. ${product.price.toLocaleString()}"
          data-description="${product.description}"
          data-address="${product.store.address}"
        >
          <img
            class="object-cover w-full h-48 rounded-t-lg"
            src="${product.image}"
            alt="${product.product_name}"
          />
          <h3 class="text-xl font-bold text-gray-900 mt-4">${product.product_name}</h3>
          <h4 class="text-gray-500 font-bold text-sm mt-2">Rp. ${product.price.toLocaleString()}</h4>
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
      productContainer.innerHTML += productCard;
    });
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
  }
}

// Panggil fungsi untuk mengambil data produk saat halaman dimuat
fetchProducts();

// Fungsi untuk menampilkan modal dengan informasi produk
function showModal(button) {
  const product = button.closest(".product-item");
  const modal = document.getElementById("productModal");

  // Perbarui isi modal dengan informasi produk
  document.getElementById("modalProductName").textContent = product.getAttribute("data-name");
  document.getElementById("modalStoreName").textContent = product.getAttribute("data-store");
  document.getElementById("modalPrice").textContent = product.getAttribute("data-price");
  document.getElementById("modalDescription").textContent = product.getAttribute("data-description");
  document.getElementById("modalAddress").textContent = product.getAttribute("data-address");
  document.getElementById("modalProductImage").src = product.querySelector("img").src;

  // Tampilkan modal dengan animasi
  modal.classList.remove("hidden");
  setTimeout(() => modal.querySelector(".transform").classList.remove("scale-95"));
}

// Fungsi untuk menutup modal
function closeModal() {
  const modal = document.getElementById("productModal");
  modal.querySelector(".transform").classList.add("scale-95");
  setTimeout(() => modal.classList.add("hidden"), 300);
}
