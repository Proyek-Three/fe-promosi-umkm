// Fungsi untuk mendapatkan jumlah produk berdasarkan user ID
async function loadProductCount() {
  try {
    const token = getToken(); // Ambil token dari cookie
    if (!token) {
      // Gunakan SweetAlert2 untuk pemberitahuan login diperlukan
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'You are not authenticated. Please login first.',
        confirmButtonText: 'OK',
        willClose: () => {
          window.location.href = "../../auth/login.html"; // Redirect ke halaman login setelah pop-up ditutup
        }
      });
      return;
    }

    // Menambahkan token ke header request
    const response = await fetch(
      "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product-seller",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Tambahkan token pada header
        },
      }
    );

    if (response.ok) {
      const result = await response.json(); // Ambil respons JSON
      const products = result.data; // Akses properti 'data'

      console.log("Products data loaded:", products);

      // Hitung jumlah produk berdasarkan status
      const acceptedProducts = products.filter(
        (product) => product.status.status === "Accepted"
      ).length;
      const rejectedProducts = products.filter(
        (product) => product.status.status === "Rejected"
      ).length;
      const pendingProducts = products.filter(
        (product) => product.status.status === "Pending"
      ).length;

      // Tampilkan jumlah produk di card
      document.getElementById(
        "product-count-accepted"
      ).textContent = `${acceptedProducts}`;
      document.getElementById(
        "product-count-rejected"
      ).textContent = `${rejectedProducts}`;
      document.getElementById(
        "product-count-pending"
      ).textContent = `${pendingProducts}`;
    } else {
      const errorResponse = await response.json();
      console.error("Failed to load product count:", errorResponse.message);
      // Tampilkan error dengan SweetAlert2 jika gagal
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Product Count',
        text: `Error: ${errorResponse.message}`,
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error("Error loading product count:", error);
    // Tampilkan error dengan SweetAlert2 jika terjadi masalah saat mengambil data
    Swal.fire({
      icon: 'error',
      title: 'An Error Occurred',
      text: 'An error occurred while loading product count.',
      confirmButtonText: 'OK'
    });
  }
}

// Fungsi untuk mengambil token dari cookie
function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

// Panggil loadProductCount() saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadProductCount);
