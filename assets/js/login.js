document.getElementById("loginButton").addEventListener("click", async function () {
    const form = document.getElementById("loginForm");
    const formData = new FormData(form);

    // Ambil data dari form
    const data = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    try {
        // Tentukan URL backend secara dinamis
        const isLocalhost = window.location.origin === "http://127.0.0.1:8080";
        const BACKEND_URL = isLocalhost
            ? "http://127.0.0.1:8080/users/login" // URL untuk backend lokal
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

            console.log(result);
            

            // Simpan token di cookie
            document.cookie = `token=${result.token}; path=/; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()};`;

            // Tampilkan pesan sukses dengan SweetAlert
            Swal.fire({
                title: "Login Berhasil",
                text: "Anda berhasil login.",
                icon: "success",
                confirmButtonText: "Lanjutkan",
            }).then(() => {
                // Arahkan berdasarkan role
                if (result.data.role === "seller") {
                    window.location.href = "../Users/dashboard.html";
                } else if (result.data.role === "admin") {
                    window.location.href = "../../Admin/dashboardadmin.html";
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
