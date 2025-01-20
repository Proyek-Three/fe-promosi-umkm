document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("[required]");

  // Isi form dengan data yang sudah disimpan dari localStorage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  if (username) {
    document.getElementById("username").value = username;
  }
  if (email) {
    document.getElementById("email").value = email;
  }

  // Fungsi untuk membuat dan menampilkan modal pop-up sukses
  function showSuccessPopup(message) {
    const modal = document.createElement("div");
    modal.id = "success-popup";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const modalContent = document.createElement("div");
    modalContent.className =
      "bg-white rounded-lg shadow-lg p-6 max-w-sm text-center";

    const title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-900";
    title.textContent = "Berhasil";

    const modalMessage = document.createElement("p");
    modalMessage.className = "mt-4 text-gray-700";
    modalMessage.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.className =
      "mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg";
    closeButton.textContent = "OK";

    closeButton.addEventListener("click", function () {
      document.body.removeChild(modal);
      window.location.href = "../dashboard/index.html"; // Redirect ke dashboard
    });

    modalContent.appendChild(title);
    modalContent.appendChild(modalMessage);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

  // Fungsi untuk menampilkan pesan error
  function showError(input, message) {
    const errorMessage = input.nextElementSibling;
    input.classList.add("border-red-500");
    if (!errorMessage || !errorMessage.classList.contains("error-message")) {
      const error = document.createElement("p");
      error.textContent = message;
      error.classList.add("error-message", "text-red-500", "text-sm", "mt-1");
      input.parentElement.appendChild(error);
    }
  }

  // Hapus pesan error jika input valid
  function clearError(input) {
    const errorMessage = input.nextElementSibling;
    input.classList.remove("border-red-500");
    if (errorMessage && errorMessage.classList.contains("error-message")) {
      errorMessage.remove();
    }
  }

  // Validasi form saat disubmit
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        showError(input, `${input.placeholder} is required.`);
      } else {
        clearError(input);
      }
    });

    if (!isValid) {
      return;
    }

    const formData = new FormData(form);
    const data = {
      username: formData.get("username") || null,
      email: formData.get("email") || null,
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("token", result.token); // Simpan token JWT
        localStorage.setItem("username", data.username || data.email); // Simpan username/email
        showSuccessPopup("Login berhasil! Anda akan diarahkan ke dashboard.");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  });
});
