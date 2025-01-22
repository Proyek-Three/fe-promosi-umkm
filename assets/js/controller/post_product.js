// Fungsi untuk mendapatkan cookie berdasarkan nama
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fungsi untuk mendekode JWT dan mendapatkan payload
function decodeJwt(token) {
  const base64Url = token.split('.')[1]; // Ambil bagian payload (second part of JWT)
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Decode URL-safe Base64
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload); // Kembalikan payload yang sudah didekode
}

document.getElementById('addProductForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Cegah form dari pengiriman default

  // Ambil token dari cookie
  const token = getCookie('token'); // Ganti dengan nama cookie tempat Anda menyimpan token

  // Periksa apakah token ada
  if (!token) {
    alert('No token found. Please log in first.');
    return;
  }

  console.log(token);

  // Dekode token dan ambil user.id
  const decodedToken = decodeJwt(token);
  const userId = decodedToken.user_id; // Ambil user.id dari payload token
  console.log("User ID:", userId); // Debugging

  // Ambil data dari form
  const productName = document.getElementById('ProductName').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const categoryId = document.getElementById('category_id').value;
  const image = document.getElementById('image').files[0]; // Ambil file yang diupload

  // Cek apakah file gambar ada
  if (!image) {
    alert('Please upload an image for the product.');
    return;
  }

  const statusId = "67910940c6747400bebfe2cd"

  // Buat FormData untuk mengirim data dengan file
  const formData = new FormData();
  formData.append('ProductName', productName);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('category.id', categoryId);
  formData.append('status.id', statusId);
  formData.append('image', image); // File gambar
  formData.append('user.id', userId); // User ID dari token yang didekode

  try {
    // Kirim data ke API
    const response = await fetch('https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/insert/product', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
  
    const result = await response.json();
    console.log(result);
  
    if (response.ok) {
      // Tampilkan pesan sukses menggunakan SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: result.message ,
        showConfirmButton: true,
      }).then(() => {
        window.location.href = 'index.html'; // Ganti dengan halaman yang sesuai setelah berhasil
      });
    } else {
      // Tampilkan pesan error menggunakan SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: result.message || 'An error occurred while adding the product.',
        showConfirmButton: true,
      });
    }
  } catch (error) {
    console.error('Error:', error);
    // Tampilkan pesan error umum menggunakan SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred while adding the product.',
      showConfirmButton: true,
    });
  }
  
});
