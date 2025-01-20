document.getElementById("registerButton").addEventListener("click", async function () {
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);

  // Siapkan data untuk dikirim
  const data = {
    name: formData.get("name"),
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
    phone_number: formData.get("phoneNumber"), // Perhatikan penamaan key sesuai backend
    store: {
      store_name: formData.get("storeName"),
      address: formData.get("storeAddress"),
    },
  };

  try {
    // Kirim request ke backend
    const response = await fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Registration successful: " + result.message);
      window.location.href = "login.html"; // Redirect jika berhasil
    } else {
      const error = await response.json();
      alert("Error: " + error.message); // Tampilkan error dari backend
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An unexpected error occurred while registering.");
  }
});
