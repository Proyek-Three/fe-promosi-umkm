document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Mencegah reload halaman setelah submit
  
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Tentukan base URL backend
      const baseURL = window.location.hostname === "localhost" 
        ? "http://127.0.0.1:8080" 
        : "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com";
  
      try {
        // Kirim permintaan POST ke backend
        const response = await fetch(`${baseURL}/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          // Jika respons tidak berhasil (status selain 200-299)
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
          return;
        }
  
        const data = await response.json();
  
        // Tampilkan pesan sukses jika login berhasil
        alert(data.message);
  
        // Redirect atau lakukan tindakan lain setelah login berhasil
        window.location.href = "../../Admin/dashboard.html";
        // Contoh: window.location.href = "/dashboard";
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  