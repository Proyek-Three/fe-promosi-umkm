console.log("adminlogout2.js loaded");

document.addEventListener("click", function (event) {
    console.log("Klik terdeteksi:", event.target); // Debugging

    const logoutButton = event.target.closest("#logoutButton");

    if (logoutButton) {
        console.log("Logout button clicked!"); // Debugging
        event.preventDefault(); // Mencegah navigasi default

        Swal.fire({
            title: "Apakah Anda Yakin Mau Logout?",
            text: "Anda akan keluar dari akun ini.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                localStorage.removeItem("userData");
                localStorage.removeItem("adminData");

                Swal.fire({
                    title: "Logout Berhasil",
                    text: "Anda telah berhasil logout.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = "../../auth/login.html";
                });
            } else {
                console.log("Logout dibatalkan.");
            }
        });
    }
});
