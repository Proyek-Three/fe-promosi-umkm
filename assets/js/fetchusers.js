document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      // Mengumpulkan data formulir untuk user
      const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        phone_number: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        store: {
          store_name: document.getElementById('store_name').value,
          address: document.getElementById('address').value
        }
      };
  
      // Validasi input
      if (!user.username || !user.password) {
        alert('Username dan password tidak boleh kosong');
        return;
      }
  
      // Menyiapkan payload untuk dikirimkan
      const payload = {
        user
      };
  
      try {
        // Mengirim data ke backend menggunakan fetch API
        const response = await fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/insert/user", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
          });
          
        if (!response.ok) {
          throw new Error('Gagal memasukkan pengguna');
        }
  
        const result = await response.json();
        if (result.success) {
          alert('Pengguna berhasil dibuat');
          // Opsi: Reset formulir atau redirect
          form.reset();
        } else {
          alert('Error: ' + result.error);
        }
  
      } catch (err) {
        alert('Error: ' + err.message);
      }
    });
  });
  