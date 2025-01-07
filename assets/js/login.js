document.getElementById("loginButton").addEventListener("click", async function () {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    // Ambil data dari form
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        // Tentukan URL backend secara dinamis
        const isLocalhost = window.location.origin === "http://127.0.0.1:8080";
        const BACKEND_URL = isLocalhost
            ? "http://127.0.0.1:8080/login" // URL untuk backend lokal
            : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/login"; // URL untuk backend Heroku

        // Kirim data ke server
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Ambil respon dari server
            const result = await response.json();

            // Simpan token di localStorage untuk autentikasi
            localStorage.setItem("token", result.token);
            
            // Simpan data user selain password di localStorage (untuk autofill)
            localStorage.setItem("username", data.username);
            localStorage.setItem("email", data.email);

            // Tampilkan pesan sukses dengan SweetAlert
            Swal.fire({
                title: "Login Berhasil",
                text: "Anda berhasil login.",
                icon: "success",
                confirmButtonText: "Lanjutkan",
            }).then(() => {
                // Redirect ke halaman utama/index
                window.location.href = "../Users/dashboard.html";
            });
        } else {
            const error = await response.json();
            // Tampilkan SweetAlert untuk error
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Coba Lagi",
            });
        }
    } catch (error) {
        console.error("Error:", error);
        // Tampilkan SweetAlert untuk error
        Swal.fire({
            title: "Terjadi Kesalahan",
            text: "An error occurred during login.",
            icon: "error",
            confirmButtonText: "Coba Lagi",
        });
    }
}); 