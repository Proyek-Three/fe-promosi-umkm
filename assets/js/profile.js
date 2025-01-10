// Script untuk membuka modal
function openModal() {
  const modal = document.getElementById("crud-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// Script untuk menutup modal
function closeModal() {
  const modal = document.getElementById("crud-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("[required]");

  // Ambil data dari localStorage dan masukkan ke form
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  // Isi form dengan data yang sudah disimpan
  if (username) {
    document.getElementById("username").value = username;
  }
  if (email) {
    document.getElementById("email").value = email;
  }
  if (password) {
    document.getElementById("password").value = password;
  }

  // Fungsi untuk membuat dan menampilkan modal pop-up
  function showSuccessPopup() {
    // Buat modal wrapper
    const modal = document.createElement("div");
    modal.id = "success-popup";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    // Buat modal konten
    const modalContent = document.createElement("div");
    modalContent.className =
      "bg-white rounded-lg shadow-lg p-6 max-w-sm text-center";

    // Judul modal
    const title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-900";
    title.textContent = "Berhasil";

    // Pesan modal
    const message = document.createElement("p");
    message.className = "mt-4 text-gray-700";
    message.textContent = "Data users sudah lengkap dan sudah tersimpan.";

    // Tombol untuk menutup modal
    const closeButton = document.createElement("button");
    closeButton.className =
      "mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg";
    closeButton.textContent = "OK";

    // Event untuk menutup modal
    closeButton.addEventListener("click", function () {
      document.body.removeChild(modal);
    });

    // Tambahkan elemen ke dalam modal
    modalContent.appendChild(title);
    modalContent.appendChild(message);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Tambahkan modal ke dalam body
    document.body.appendChild(modal);
  }

  form.addEventListener("submit", function (event) {
    let isValid = true;

    inputs.forEach((input) => {
      const errorMessage = input.nextElementSibling;

      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("border-red-500");

        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
          const error = document.createElement("p");
          error.textContent = `${input.placeholder} is required.`; // Perbaiki dengan backticks
          error.classList.add("error-message", "text-red-500", "text-sm", "mt-1");
          input.parentElement.appendChild(error);
        }
      } else {
        input.classList.remove("border-red-500");
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.remove();
        }
      }
    });

    if (!isValid) {
      event.preventDefault();
    } else {
      event.preventDefault(); // Hentikan pengiriman form untuk menampilkan pop-up
      showSuccessPopup(); // Tampilkan modal pop-up sukses
    }
  });
});
// Fungsi untuk membuat dan menampilkan modal peringatan sebelum logout
function showLogoutConfirmation() {
  const modal = document.createElement("div");
  modal.id = "logout-confirmation-modal";
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  const modalContent = document.createElement("div");
  modalContent.className =
    "bg-white rounded-lg shadow-lg p-6 max-w-sm text-center";

  const title = document.createElement("h2");
  title.className = "text-lg font-bold text-gray-900";
  title.textContent = "Konfirmasi Logout";

  const message = document.createElement("p");
  message.className = "mt-4 text-gray-700";
  message.textContent = "Apakah Anda yakin ingin logout?";

  // Tombol Ya untuk logout
  const confirmButton = document.createElement("button");
  confirmButton.className =
    "mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg mr-2";
  confirmButton.textContent = "Ya";

  // Tombol Tidak untuk membatalkan logout
  const cancelButton = document.createElement("button");
  cancelButton.className =
    "mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg";
  cancelButton.textContent = "Tidak";

  // Event untuk tombol Ya
  confirmButton.addEventListener("click", function () {
    logoutUser(); // Melanjutkan proses logout
    document.body.removeChild(modal); // Menghapus modal setelah logout
  });

  // Event untuk tombol Tidak
  cancelButton.addEventListener("click", function () {
    document.body.removeChild(modal); // Menutup modal tanpa logout
  });

  // Menambahkan elemen ke dalam modal
  modalContent.appendChild(title);
  modalContent.appendChild(message);
  modalContent.appendChild(confirmButton);
  modalContent.appendChild(cancelButton);
  modal.appendChild(modalContent);

  // Menambahkan modal ke dalam body
  document.body.appendChild(modal);
}

// Fungsi untuk membuat dan menampilkan toast setelah logout
function showLogoutToast() {
  const toast = document.createElement("div");
  toast.style.position = "fixed";
  toast.style.top = "50%";  // Posisi di tengah layar secara vertikal
  toast.style.left = "50%";  // Posisi di tengah layar secara horizontal
  toast.style.transform = "translate(-50%, -50%)";  // Menyeimbangkan posisi di tengah
  toast.style.backgroundColor = "#4caf50";
  toast.style.color = "white";
  toast.style.padding = "20px 40px";  // Padding lebih besar
  toast.style.borderRadius = "10px";  // Menambah kelengkungan border
  toast.style.fontSize = "20px";  // Memperbesar ukuran font
  toast.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";  // Menambah bayangan
  toast.style.zIndex = "9999";
  toast.style.textAlign = "center";  // Menyelaraskan teks ke tengah
  toast.textContent = "Akun Anda berhasil keluar";

  // Menambahkan toast ke body
  document.body.appendChild(toast);

  // Menghilangkan toast setelah beberapa detik
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s";
    toast.style.opacity = "0";
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 2000);
}

// Fungsi untuk logout dan menampilkan toast
function logoutUser() {
  console.log("Logging out..."); // Debug log

  // Hapus data login dari localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");

  // Tampilkan toast
  showLogoutToast();

  // Redirect ke halaman login setelah beberapa detik
  setTimeout(() => {
    window.location.href = "../auth/login.html";
  }, 2500);
}

// Event listener untuk DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, running loadUserProfile...");

  // Jalankan fungsi loadUserProfile untuk menampilkan username
  loadUserProfile();

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    console.log("Logout button found, adding event listener...");
    // Ganti event listener logout untuk menunjukkan konfirmasi logout
    logoutButton.addEventListener("click", function () {
      showLogoutConfirmation(); // Tampilkan modal konfirmasi logout
    });
  } else {
    console.error("Element with ID 'logoutButton' not found in DOM!");
  }
});

// Fungsi untuk menampilkan username di dropdown
function loadUserProfile() {
  const username = localStorage.getItem("username");
  console.log("Username:", username); // Debug log

  if (username) {
    const dropdownUsername = document.getElementById("dropdownUsername");
    if (dropdownUsername) {
      dropdownUsername.textContent = username; // Menampilkan username
    } else {
      console.error("Element with ID 'dropdownUsername' not found");
    }
  } else {
    console.warn("Username not found in localStorage. Redirecting to login...");
    // Jika username tidak ditemukan, redirect ke halaman login
    window.location.href = "../auth/login.html";
  }
}





