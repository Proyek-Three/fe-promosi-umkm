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
      <button class="text-blue-500 hover:underline">Edit</button>
      <button class="text-red-500 hover:underline">Delete</button>
    </td>
  `;

  tableBody.appendChild(newRow);
}

// Fungsi untuk memuat semua data pengguna dari server
async function loadUsersData() {
    try {
      const token = getToken();
      if (!token) {
        alert("You are not authenticated. Please login first.");
        window.location.href = "../../auth/login.html";
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
        alert(`Failed to load users: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error("Error loading users data:", error);
      alert("An error occurred while loading users data.");
    }
  }
  

// Panggil loadUsersData() saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadUsersData);
