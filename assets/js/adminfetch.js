const isLocalhost = window.location.origin.includes("127.0.0.1");
const USERS_URL = isLocalhost
  ? "http://127.0.0.1:8080/users"
  : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users";

function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

// Fungsi untuk menambahkan baris ke tabel
function addRowToTable(user) {
  const tableBody = document.getElementById("usersTableBody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td class="px-4 py-3">${user.role || "User"}</td>
    <td class="px-4 py-3">${user.name}</td>
    <td class="px-4 py-3">${user.username}</td>
    <td class="px-4 py-3">${user.phone_number}</td>
    <td class="px-4 py-3">${user.email}</td>
    <td class="px-4 py-3">${user.store?.store_name || "-"}</td>
    <td class="px-4 py-3">${user.store?.address || "-"}</td>
    <td class="px-4 py-3">
  <button 
    onclick="deleteUser('${user._id}')" 
    class="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
  >
    <i class="fa-solid fa-trash mr-2"></i> Delete
  </button>
</td>
  `;

  tableBody.appendChild(newRow);
}

// Fungsi untuk memuat semua data pengguna dari server
async function loadUsersData() {
  try {
    const token = getToken();
    if (!token) {
      // Menggunakan SweetAlert2 untuk menampilkan pesan kesalahan
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

    const response = await fetch(USERS_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json(); // Ambil respons JSON
      const users = result.data; // Akses properti 'data'

      console.log("Users data loaded:", users);

      const tableBody = document.getElementById("usersTableBody");
      tableBody.innerHTML = ""; // Kosongkan tabel sebelum mengisi ulang

      // Tambahkan semua pengguna ke tabel
      users.forEach((user) => addRowToTable(user));
    } else {
      const errorResponse = await response.json();
      console.error("Failed to load users:", errorResponse.message);
      // Menampilkan SweetAlert2 pop-up untuk error saat mengambil data
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Users',
        text: `Failed to load users: ${errorResponse.message}`,
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    console.error("Error loading users data:", error);
    // Menampilkan SweetAlert2 pop-up untuk kesalahan saat memuat data pengguna
    Swal.fire({
      icon: 'error',
      title: 'An Error Occurred',
      text: 'An error occurred while loading users data.',
      confirmButtonText: 'OK'
    });
  }
}

// Panggil loadUsersData() saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadUsersData);
