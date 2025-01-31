import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllCategory } from "./controller/category/get_category.js";
import { urlAPI } from "./config/category/url_category.js";

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
            // Jika token tidak ada, arahkan ke halaman login dengan pop-up SweetAlert2
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

        console.log("Token valid. Mengambil data kategori...");
        // Jika token ada, lanjutkan untuk mengambil data kategori
        get(urlAPI, GetAllCategory);

    } catch (error) {
        // Tangani kesalahan jika terjadi masalah saat mengambil token
        console.error("Terjadi kesalahan saat memeriksa token:", error);
        Swal.fire({
            icon: 'error',
            title: 'Something Went Wrong',
            text: 'Please try again later.',
            confirmButtonText: 'OK',
            willClose: () => {
                window.location.href = "../../auth/login.html"; // Redirect ke halaman login jika ada error
            }
        });
    }
}

window.onload = loadData;
