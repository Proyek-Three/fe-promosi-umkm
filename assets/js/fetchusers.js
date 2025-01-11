// Tentukan URL backend secara dinamis berdasarkan lingkungan (localhost atau hosting)
const isLocalhost = window.location.origin === "http://127.0.0.1:5501"; // Sesuaikan dengan URL frontend di lokal Anda
const BACKEND_URL = isLocalhost
    ? "http://127.0.0.1:8080/insert/user" // URL untuk backend lokal
    : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/insert/user"; // URL untuk backend Heroku

// Fungsi untuk mengirimkan data ke backend
async function submitForm() {
    // Ambil data dari form HTML
    const formData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        phone_number: document.getElementById("phone_number").value,
        email: document.getElementById("email").value,
        store: {
            store_name: document.getElementById("store_name").value,
            address: document.getElementById("address").value
        }
    };

    try {
        // Kirim data ke backend dengan metode POST
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Periksa jika response berhasil
        if (response.ok) {
            const result = await response.json();
            console.log("Data berhasil disubmit:", result);
            alert("User data saved successfully!");
        } else {
            console.log("Terjadi kesalahan saat mengirim data:", response.statusText);
            alert("Failed to submit data. Please try again.");
        }
    } catch (error) {
        console.error("Error terjadi:", error);
        alert("An error occurred. Please try again.");
    }
}

// Event listener untuk form submit
document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form untuk reload halaman
    submitForm(); // Panggil fungsi submitForm saat form disubmit
});
