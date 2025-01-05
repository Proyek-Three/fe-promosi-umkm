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
          error.textContent = `${input.placeholder} is required.`;
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
