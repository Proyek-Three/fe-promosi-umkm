import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

async function logout() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in");
    window.location.href = "../auth/admin/login.html";
    return;
  }

  try {
    const response = await fetch(
      "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/admin/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("alertShown");
      Swal.fire({
        icon: "success",
        title: "Logout Successful",
        text: "You will be directed to login page",
        timer: 2000,
        backdrop: true,
        customClass: {
          container: "backdrop-blur-md",
        },
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = "../auth/admin/login.html";
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Logout Failed",
      customClass: {
        container: "backdrop-blur-md",
      },
      text: console.error(error),
    });
  }
}

// Tambahkan event listener setelah dropdown dirender
document.addEventListener("DOMContentLoaded", () => {
  const profileButton = document.querySelector('[aria-label="Account"]');

  // Listener untuk membuka dropdown
  profileButton.addEventListener("click", () => {
    // Beri waktu agar menu dirender terlebih dahulu
    setTimeout(() => {
      const logoutButton = document.getElementById("logoutButton");
      if (logoutButton) {
        logoutButton.addEventListener("click", logout);
        console.log("Logout button event listener added.");
      } else {
        console.error("Logout button not found!");
      }
    }, 100);
  });
});
