// Daftar URL yang sah (whitelist)
const validRedirects = [
  // Landing page
  "https://proyek-three.github.io/fe-promosi-umkm/index.html",
  "https://proyek-three.github.io/fe-promosi-umkm/products.html",
  // Halaman login dan register
  "https://proyek-three.github.io/fe-promosi-umkm/auth/register.html",
  "https://proyek-three.github.io/fe-promosi-umkm/auth/login.html",
  // Halaman admin
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/dashboardadmin.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-users/index.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-produk/index.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-produk/edit.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-kategori/index.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-kategori/tambah.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Admin/data-kategori/edit.html",
  // Halaman seller
  "https://proyek-three.github.io/fe-promosi-umkm/Users/dashboard.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Users/data-produk/index.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Users/data-produk/tambah.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Users/data-produk/edit.html",
  "https://proyek-three.github.io/fe-promosi-umkm/Users/profile/index.html",
];

// Fungsi untuk memvalidasi URL
function isValidRedirect(redirectURL) {
  return validRedirects.includes(redirectURL);
}

// Fungsi untuk melakukan redirect setelah validasi
function redirectTo() {
  const redirectURL = new URLSearchParams(window.location.search).get(
    "redirect"
  );

  console.log("Redirect URL:", redirectURL); // Debugging log

  if (redirectURL && isValidRedirect(redirectURL)) {
    console.log("Valid redirect, going to:", redirectURL); // Debugging log
    Swal.fire({
      icon: 'success',
      title: 'Redirecting...',
      text: 'You will be redirected to the requested page.',
      showConfirmButton: false,
      timer: 2000, // 2 seconds
    }).then(() => {
      window.location.href = redirectURL; // Lakukan pengalihan setelah 2 detik
    });
  } else {
    console.log("Invalid or missing redirect, going to default page."); // Debugging log
    Swal.fire({
      icon: 'error',
      title: 'Invalid Redirect',
      text: 'Redirect URL is not valid or missing. You will be redirected to the homepage.',
      showConfirmButton: false,
      timer: 3000, // 3 seconds
    }).then(() => {
      window.location.href =
        "https://proyek-three.github.io/fe-promosi-umkm/index.html"; // Pengalihan setelah 3 detik
    });
  }
}

// Panggil fungsi redirectTo saat halaman dimuat
window.onload = redirectTo;
