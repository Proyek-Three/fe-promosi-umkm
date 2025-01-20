// Tentukan URL backend secara dinamis
const isLocalhost = window.location.origin === "http://127.0.0.1:5501";
const BACKEND_URL = isLocalhost
    ? "http://127.0.0.1:8080/users" // URL untuk backend lokal
    : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users"; // URL untuk backend Heroku

// Fungsi untuk mengambil data pengguna dari backend
async function fetchUsers() {
    try {
        const response = await fetch(BACKEND_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch users data");
        }

        const users = await response.json();

        // Menampilkan data pengguna di tabel
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ''; // Kosongkan tbody sebelum menampilkan data baru

        users.forEach(user => {
            const tr = document.createElement("tr");
            tr.classList.add("text-gray-700", "dark:text-gray-400");

            tr.innerHTML = `
                <td class="px-4 py-3 text-sm"></td>
                <td class="px-4 py-3 text-sm"></td>
                <td class="px-4 py-3 text-sm">${user.username}</td>
                <td class="px-4 py-3 text-sm">${user.phone_number}</td>
                <td class="px-4 py-3 text-sm">${user.email}</td>
                <td class="px-4 py-3 text-sm">${user.store.store_name}</td>
                <td class="px-4 py-3 text-sm"></td>
                <td class="px-4 py-3">
                    <div class="flex items-center space-x-4 text-sm">
                        <button class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                            <i class="fa-solid fa-trash mr-2"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Panggil fungsi fetchUsers saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchUsers);
