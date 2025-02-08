import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllProduct } from "./controller/get_product.js"; // Fungsi untuk mengisi data produk
import { urlAPI } from "./config/url_product.js"; // URL API untuk produk

// Fungsi untuk mendapatkan token dari cookie atau localStorage
async function getToken() {
  // Sesuaikan dengan bagaimana kamu menyimpan token (cookie atau localStorage)
  return localStorage.getItem("token") || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

// Skrip utama untuk mengecek token dan mengambil data produk
async function loadData() {
    try {
      const token = await getToken(); // Ambil token dari cookie atau localStorage
      console.log("Token ditemukan: ", token); // Debugging untuk memastikan token ditemukan
      
      // Cek apakah token ada
      if (!token) {
        // Jika token tidak ada, tampilkan SweetAlert2 pop-up
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
  
      // Jika token ada, lanjutkan untuk mengambil data produk
      console.log("Token valid. Mengambil data produk...");
      get(urlAPI, GetAllProduct); // Panggil fungsi untuk mengambil data produk
  
    } catch (error) {
      // Tangani kesalahan jika terjadi masalah saat mengambil token
      console.error("Terjadi kesalahan saat memeriksa token:", error);
  
      // Menampilkan SweetAlert2 pop-up jika terjadi kesalahan
      Swal.fire({
        icon: 'error',
        title: 'Something Went Wrong',
        text: 'Something went wrong. Please try again later.',
        confirmButtonText: 'OK',
        willClose: () => {
          window.location.href = "../../auth/login.html"; // Redirect ke halaman login setelah pop-up ditutup
          // window.location.href = "./../Admin/data-produk/index.html"; // Redirect ke halaman login setelah pop-up ditutup
        }
      });
    }
  }
  
  // Panggil loadData saat halaman dimuat
  window.onload = loadData;
  
