const isLocalhost = window.location.origin.includes("127.0.0.1");
const PROFILE_URL = isLocalhost
  ? "http://127.0.0.1:8080/users/profile" // Endpoint untuk mendapatkan profil
  : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/profile";

const UPDATE_PROFILE_URL = isLocalhost
  ? "http://127.0.0.1:8080/update/users/profile" // Endpoint untuk update profil
  : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/update/users/profile";

// Fungsi untuk mendapatkan token autentikasi dari cookie
function getToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
}

// Fungsi untuk mengisi form dengan data dari backend
async function loadProfileData() {
  try {
    const token = getToken();
    if (!token) {
      alert("You are not authenticated. Please login first.");
      window.location.href = "../../auth/login.html";
      return;
    }

    const response = await fetch(PROFILE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sertakan token di Authorization header
      },
    });

    if (response.ok) {
      const userProfile = await response.json();
      console.log("Profile data loaded:", userProfile);

      // Isi form dengan data pengguna
      document.getElementById("username").value =
        userProfile.data.username || "";
      document.getElementById("phone_number").value =
        userProfile.data.phone_number || "";
      document.getElementById("email").value = userProfile.data.email || "";
      document.getElementById("store_name").value =
        userProfile.data.store?.store_name || "";
      document.getElementById("address").value =
        userProfile.data.store?.address || "";

    } else {
      const errorResponse = await response.json();
      console.error("Failed to load profile:", errorResponse.message);
      alert(`Failed to load profile: ${errorResponse.message}`);
    }
  } catch (error) {
    console.error("Error loading profile data:", error);
    alert("An error occurred while loading profile data.");
  }
}

// Fungsi untuk mengirim data yang diubah ke backend
async function editProfile(event) {
  event.preventDefault(); // Mencegah form reload halaman

  const token = getToken();
  if (!token) {
    alert("You are not authenticated. Please login first.");
    window.location.href = "../../auth/login.html";
    return;
  }

  // Ambil data dari form
  const updatedData = {
    username: document.getElementById("username").value,
    phone_number: document.getElementById("phone_number").value,
    email: document.getElementById("email").value,
    store: {
      store_name: document.getElementById("store_name").value,
      address: document.getElementById("address").value,
    },
  };

  try {
    const response = await fetch(UPDATE_PROFILE_URL, {
      method: "PUT", // Gunakan metode PUT untuk update data
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Sertakan token di Authorization header
      },
      body: JSON.stringify(updatedData), // Kirim data sebagai JSON
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      console.log("Profile updated successfully:", updatedProfile);

      // Tampilkan pesan sukses dan kembali ke dashboard admin
      alert("Profile updated successfully!");
    } else {
      const errorResponse = await response.json();
      console.error("Failed to update profile:", errorResponse.message);
      alert(`Failed to update profile: ${errorResponse.message}`);
    }
  } catch (error) {
    console.error("Error updating profile data:", error);
    alert("An error occurred while updating profile data.");
  }
}

// Panggil fungsi loadProfileData saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadProfileData);

// Tambahkan event listener pada tombol Edit Data
document.getElementById("userForm").addEventListener("submit", editProfile);
