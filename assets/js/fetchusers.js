// Tentukan URL backend secara dinamis
const isLocalhost = window.location.origin === "http://127.0.0.1:5501"; // Sesuaikan URL lokal
const BACKEND_URL = isLocalhost
  ? "http://127.0.0.1:8080/insert/user"
  : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/insert/user";

// Fungsi untuk mengisi kembali data form dari localStorage
function loadFormData() {
  const savedData = localStorage.getItem("userFormData");
  console.log("Loading form data:", savedData);
  if (savedData) {
    const formData = JSON.parse(savedData);
    document.getElementById("username").value = formData.username || "";
    document.getElementById("phone_number").value = formData.phone_number || "";
    document.getElementById("email").value = formData.email || "";
    document.getElementById("store_name").value = formData.store_name || "";
    document.getElementById("address").value = formData.address || "";

    // Dekripsi password sebelum mengisi field password
    if (formData.password) {
      document.getElementById("password").value = atob(formData.password);
    }
  }
}

// Fungsi untuk menyimpan data form ke localStorage
function saveFormData() {
  const formData = {
    username: document.getElementById("username").value,
    password: btoa(document.getElementById("password").value), // Enkripsi password
    phone_number: document.getElementById("phone_number").value,
    email: document.getElementById("email").value,
    store_name: document.getElementById("store_name").value,
    address: document.getElementById("address").value,
  };
  console.log("Saving form data:", formData);
  localStorage.setItem("userFormData", JSON.stringify(formData));
}

// Fungsi untuk mengirimkan data ke backend
async function submitForm() {
  const formData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    phone_number: document.getElementById("phone_number").value,
    email: document.getElementById("email").value,
    store: {
      store_name: document.getElementById("store_name").value,
      address: document.getElementById("address").value,
    },
  };

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data berhasil disubmit:", result);
      alert("User data saved successfully!");
      localStorage.removeItem("userFormData");
    } else {
      console.error("Error saat submit:", response.statusText);
      alert("Failed to submit data.");
    }
  } catch (error) {
    console.error("Error terjadi:", error);
    alert("An error occurred. Please try again.");
  }
}

// Event listener untuk form submit
document.getElementById("userForm").addEventListener("submit", function (event) {
  event.preventDefault();
  submitForm();
});

// Simpan data saat input berubah
document.querySelectorAll("#userForm input, #userForm textarea").forEach((input) => {
  input.addEventListener("input", saveFormData);
});

// Load data saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadFormData);
