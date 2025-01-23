  // Fungsi untuk memuat jumlah data dari API
  async function loadCounts() {
    try {
      const token = getToken(); // Ambil token dari cookie
      if (!token) {
        alert("You are not authenticated. Please login first.");
        window.location.href = "../../auth/login.html";
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
        // Jika ada respons yang gagal, tampilkan error
        alert("Failed to load counts. Please check your API responses.");
      }
    } catch (error) {
      console.error("Error loading counts:", error);
      alert("An error occurred while loading counts.");
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
