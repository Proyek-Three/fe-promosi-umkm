function confirmDelete(IDHAPUS) {
  if (confirm("Apakah ingin menghapus data ID " + IDHAPUS + "?")) {
    deleteData(IDHAPUS);
  }
}

function deleteData(IDHAPUS) {
  var productId = IDHAPUS;
  var target_url =
    "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product/delete/" +
    productId;

  // Ambil token dari cookie
  var token = getCookie("token"); // Mengambil token dari cookie dengan nama 'authToken'

  if (!token) {
    alert("Tidak ada token otentikasi. Silakan login terlebih dahulu.");
    return;
  }

  var requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token, // Menambahkan token untuk otentikasi
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message);
      location.reload();
    })
    .catch((error) => console.log("Error:", error));
}

// Fungsi untuk mendapatkan cookie berdasarkan nama
function getCookie(name) {
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArr = decodedCookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var c = cookieArr[i].trim();
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return "";
}
