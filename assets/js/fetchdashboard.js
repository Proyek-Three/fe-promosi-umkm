// Fungsi untuk mendecode Base64 URL-safe menjadi string
function base64UrlDecode(base64Url) {
  // Gantilah karakter-karakter yang tidak sesuai dengan Base64 standar
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decoded = atob(base64); // Decode Base64
  return decoded;
}

// Fungsi untuk mendecode token JWT
function decodeJWT(token) {
  const parts = token.split('.'); // Pisahkan token menjadi tiga bagian
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  // Decode bagian payload (bagian kedua)
  const payload = base64UrlDecode(parts[1]);
  return JSON.parse(payload); // Ubah menjadi objek JSON
}


async function loadCounts() {
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

     // Decode token dan ambil role
     const decodedToken = decodeJWT(token);
     const userRole = decodedToken.role;
     console.log("User role:", userRole);
     
 
     // Jika role bukan seller, tampilkan pesan error dan batalkan eksekusi
     if (userRole !== "admin") {
       Swal.fire({
         icon: 'error',
         title: 'Access Denied',
         text: 'You do not have permission to access this page.',
         confirmButtonText: 'OK',
         willClose: () => {
           window.location.href = "../../auth/login.html"; // Redirect ke halaman login jika role tidak sesuai
         }
       });
       return;
     }

    // Fetch jumlah data dari masing-masing API
    const [usersResponse, productsResponse, categoriesResponse] = await Promise.all([
      fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    // Validasi respons dari masing-masing API
    if (usersResponse.ok && productsResponse.ok && categoriesResponse.ok) {
      const usersData = await usersResponse.json();
      const productsData = await productsResponse.json();
      const categoriesData = await categoriesResponse.json();

      // Jumlah data dari masing-masing API
      const usersCount = usersData.data.length; // Data users adalah array di dalam "data"
      const productsCount = productsData.length; // Data products adalah array langsung
      const categoriesCount = categoriesData.length; // Data categories adalah array langsung

      console.log("Users Count:", usersCount);
      console.log("Products Count:", productsCount);
      console.log("Categories Count:", categoriesCount);

      // Tampilkan jumlah data di masing-masing card
      document.getElementById("users-count").textContent = `${usersCount}`;
      document.getElementById("products-count").textContent = `${productsCount}`;
      document.getElementById("categories-count").textContent = `${categoriesCount}`;

      // Hitung produk dengan status "Pending"
      loadPendingProductsCount(productsData);
    } else {
      // Jika ada respons yang gagal, tampilkan error dengan SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Counts',
        text: 'Please check your API responses.',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error("Error loading counts:", error);
    // Tampilkan error dengan SweetAlert2 jika terjadi masalah saat mengambil data
    Swal.fire({
      icon: 'error',
      title: 'An Error Occurred',
      text: 'An error occurred while loading counts.',
      confirmButtonText: 'OK'
    });
  }
}

// Fungsi untuk menghitung produk dengan status Pending
function loadPendingProductsCount(productsData) {
  try {
    // Filter produk dengan status "Pending"
    const pendingProducts = productsData.filter(
      (product) => product.status.status === "Pending"
    );

    // Hitung jumlah produk dengan status Pending
    const pendingCount = pendingProducts.length;

    console.log("Pending Products Count:", pendingCount);

    // Tampilkan jumlah produk Pending di card
    document.getElementById("pending-products-count").textContent = `${pendingCount}`;
  } catch (error) {
    console.error("Error calculating pending products count:", error);
  }
}

// Fungsi untuk mengambil token dari cookie
function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

// Panggil loadCounts() saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadCounts);
