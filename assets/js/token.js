// auth.js
async function checkAuth() {
    try {
      const token = await getToken(); // Ambil token dari cookie (asumsi getToken() asinkron)
      if (!token) {
        alert("You are not authenticated. Please login first.");
        window.location.href = "../../auth/login.html"; // Redirect ke halaman login
        return;
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memeriksa token:", error);
      alert("Something went wrong. Please try again later.");
      window.location.href = "../../auth/login.html"; // Redirect ke halaman login jika ada error
    }
  }
  
  // Panggil fungsi checkAuth ketika halaman ini dimuat
  window.onload = checkAuth;