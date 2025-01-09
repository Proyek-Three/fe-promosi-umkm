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



  function showModal(button) {
    const product = button.closest('.product-item');
    const modal = document.getElementById('productModal');

    // Update modal content
    document.getElementById('modalProductName').textContent = product.getAttribute('data-name');
    document.getElementById('modalStoreName').textContent = product.getAttribute('data-store');
    document.getElementById('modalPrice').textContent = product.getAttribute('data-price');
    document.getElementById('modalDescription').textContent = product.getAttribute('data-description');
    document.getElementById('modalAddress').textContent = product.getAttribute('data-address');
    document.getElementById('modalProductImage').src = product.querySelector('img').src;

    // Show modal with animation
    modal.classList.remove('hidden');
    setTimeout(() => modal.querySelector('.transform').classList.remove('scale-95'));
  }

  function closeModal() {
    const modal = document.getElementById('productModal');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
