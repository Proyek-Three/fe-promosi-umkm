document
  .getElementById("loginButton")
  .addEventListener("click", async function () {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    // Ambil data dari form
    const username = formData.get("username");
    const password = formData.get("password");

    // Validasi username tidak boleh dalam format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(username)) {
      Swal.fire({
        title: "Format Tidak Valid",
        text: "Username tidak boleh dalam format email.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return; // Hentikan proses jika username dalam format email
    }

    const data = { username, password };

    try {
      // Tentukan URL backend secara dinamis
      const isLocalhost = window.location.origin === "http://127.0.0.1:8080";
      const BACKEND_URL = isLocalhost
        ? "http://127.0.0.1:8080/users/login"
        : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/login";

      // Kirim data ke server
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

        // Simpan token di cookie
        document.cookie = `token=${result.token}; path=/; expires=${new Date(
          Date.now() + 60 * 60 * 1000
        ).toUTCString()};`;

        // Tampilkan pesan sukses
        Swal.fire({
          title: "Login Berhasil",
          text: "Anda berhasil login.",
          icon: "success",
          confirmButtonText: "Lanjutkan",
        }).then(() => {
          if (result.data.role === "seller") {
            localStorage.setItem("userData", JSON.stringify(result.data));
            window.location.href = "../Users/dashboard.html";
          } else if (result.data.role === "admin") {
            localStorage.setItem("adminData", JSON.stringify(result.data));
            window.location.href = "../Admin/dashboardadmin.html";
          } else {
            Swal.fire({
              title: "Peran Tidak Dikenali",
              text: "Silakan hubungi administrator.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        });
      } else {
        const error = await response.json();
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Terjadi Kesalahan",
        text: "An error occurred during login.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
    }
  });
