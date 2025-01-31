document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logoutButton").addEventListener("click", function () {
        Swal.fire({
            title: "Apakah Anda Yakin Mau Logout?",
            text: "Anda akan keluar dari akun ini.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                // Show success message before redirect
                Swal.fire({
                    title: "Logout Berhasil",
                    text: "Anda telah berhasil logout.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Remove cookies and localStorage
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    localStorage.removeItem("userData");
                    localStorage.removeItem("adminData");
                    
                    // Redirect to login page
                    window.location.href = "../../auth/login.html";
                });
            } else {
                console.log("Logout dibatalkan.");
            }
        });
    });
});
