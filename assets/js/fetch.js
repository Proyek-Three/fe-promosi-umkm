document.getElementById("registerButton").addEventListener("click", async function () {
  const form = document.getElementById("registerForm");
  const formData = new FormData(form);

  const data = {
    username: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    // Tentukan URL backend
    const isLocalhost = window.location.origin === "http://127.0.0.1:8080";
    const BACKEND_URL = isLocalhost
      ? "http://127.0.0.1:8080/register"
      : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/users/register";

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      window.location.href = "login.html";
    } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while registering.");
  }
});
