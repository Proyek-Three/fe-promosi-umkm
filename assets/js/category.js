// Select Category
// Ambil elemen <select>
const categorySelect = document.getElementById("category_name");

// Fungsi untuk mendapatkan data dari API
async function fetchCategories() {
  try {
    const response = await fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category");

    // Periksa apakah response berhasil
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse data JSON
    const categories = await response.json();

    // Tambahkan opsi ke elemen <select>
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id; // Gunakan id sebagai nilai
      option.textContent = category.category_name; // Tampilkan nama kategori
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Gagal mengambil data kategori:", error);
  }
}

// Panggil fungsi untuk fetch data
fetchCategories();

// Filter Products
// Fetch untuk filter kategori
const apiUrl = "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category";
      
async function fetchCategories() {
  try {
    const response = await fetch(apiUrl);
    const categories = await response.json();

    const container = document.getElementById('filter-container');

    // Tambahkan kategori "All" secara manual
    container.innerHTML = `
      <span
        class="filter-category active"
        data-category="all"
        onclick="filterProducts(this)"
      >
        All
      </span>
    `;

    // Render kategori lainnya berdasarkan data dari API
    categories.forEach(category => {
      const span = document.createElement('span');
      span.className = 'filter-category';
      span.dataset.category = category.category_name.toLowerCase(); // Menggunakan slug nama kategori
      span.onclick = () => filterProducts(span);
      span.textContent = category.category_name;

      container.appendChild(span);
    });
  } catch (error) {
    console.error("Gagal memuat kategori:", error);
  }
}

// Panggil fungsi untuk memuat kategori saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchCategories);

// Fungsi untuk menangani filter
function filterProducts(element) {
  const category = element.dataset.category;

  // Hilangkan class 'active' dari semua elemen kategori
  document.querySelectorAll('.filter-category').forEach(el => el.classList.remove('active'));

  // Tambahkan class 'active' pada elemen yang dipilih
  element.classList.add('active');

  // Implementasikan logika filter produk (sesuai kebutuhan Anda)
  console.log(`Produk difilter berdasarkan kategori: ${category}`);
}

function filterProducts(selectedCategory) {
    // Remove 'active' class from all filter buttons
    document.querySelectorAll('.filter-category').forEach((el) => {
      el.classList.remove('active');
    });

    // Add 'active' class to the clicked filter button
    selectedCategory.classList.add('active');

    // Get the selected category
    const category = selectedCategory.getAttribute('data-category');
    const products = document.querySelectorAll('.product-item');

    // Filter products
    products.forEach((product) => {
      const productCategory = product.getAttribute('data-category');

      if (category === 'all' || productCategory === category) {
        product.classList.add('show'); // Show matched products
      } else {
        product.classList.remove('show'); // Hide unmatched products
      }
    });
  }

  // Initialize with "All" filter
  document.addEventListener('DOMContentLoaded', () => {
    filterProducts(document.querySelector('.filter-category.active'));
  });
