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
            alert(result.message); // Tampilkan pesan sukses

            // Simpan token di localStorage untuk autentikasi
            localStorage.setItem("token", result.token);

            // Redirect ke halaman utama/dashboard
            window.location.href = "dashboard.html";
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during login.");
    }
});
