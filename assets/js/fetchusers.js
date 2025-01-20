// Tentukan URL backend secara dinamis
const isLocalhost = window.location.origin.includes("127.0.0.1");
const PROFILE_URL = isLocalhost
  ? "http://127.0.0.1:8080/users/profile" // Sesuaikan endpoint profile
  : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/profile";

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
      window.location.href = "/login.html";
      return;
    }

    const response = await fetch(PROFILE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userProfile = await response.json();
      console.log("Profile data loaded:", userProfile);

      document.getElementById("username").value = userProfile.username || "";
      document.getElementById("phone_number").value =
        userProfile.phone_number || "";
      document.getElementById("email").value = userProfile.email || "";
      document.getElementById("store_name").value =
        userProfile.store?.store_name || "";
      document.getElementById("address").value =
        userProfile.store?.address || "";
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


// Panggil fungsi loadProfileData saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadProfileData);
