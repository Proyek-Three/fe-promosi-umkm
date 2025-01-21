// Fungsi untuk mengambil cookie berdasarkan nama
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Base URL untuk API (lokal atau deploy)
const baseURL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:8080'  // Local API
    : 'https://bp-promosi-umkm-0fd00e17451e.herokuapp.com';  // Deployed API

// Fungsi untuk mengambil data produk dan mengisi dropdown status
async function fetchProductData() {
    const productId = new URLSearchParams(window.location.search).get('productId');
    if (!productId) {
        console.error('Product ID is missing from the URL');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/product/${productId}`);
        if (!response.ok) {
            const errorText = await response.text(); // Dapatkan teks error dari respons
            throw new Error(`Failed to fetch product data. Error: ${errorText}`);
        }

        const product = await response.json();
        console.log('Fetched Product Data:', product); // Debug data produk

        const statusSelect = document.getElementById('status');
        if (statusSelect) {
            // Isi dropdown dengan status yang diterima
            statusSelect.value = product.status === 'accepted' ? 'accepted' : 'rejected';
        } else {
            console.error('Status dropdown not found');
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
        alert(`Error fetching product data: ${error.message}`);
    }
}

// Fungsi untuk memperbarui status produk
async function updateProductStatus() {
    const status = document.getElementById('status').value;
    const productId = new URLSearchParams(window.location.search).get('productId');

    if (!status) {
        alert('Harap pilih status.');
        return;
    }

    if (!productId) {
        alert('Product ID tidak ditemukan.');
        return;
    }

    const token = getCookie('token'); // Menggunakan cookie 'token'
    if (!token) {
        alert('Tidak terautentikasi. Silakan login terlebih dahulu.');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/update/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status: {
                    _id: product.status._id, // Menggunakan _id status yang lama
                    status: status // Status baru yang dipilih dari dropdown
                }
            }),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Dapatkan pesan error dari server
            throw new Error(`Gagal memperbarui status produk. Error: ${errorText}`);
        }

        const updatedProduct = await response.json();
        alert('Status produk berhasil diperbarui!');
        console.log('Produk yang diperbarui:', updatedProduct);
    } catch (error) {
        console.error("Error saat memperbarui status produk:", error);
        alert(`Terjadi kesalahan saat memperbarui status produk: ${error.message}`);
    }
}


// Panggil fungsi fetchProductData saat halaman dimuat untuk mengisi dropdown
fetchProductData();

// Event listener untuk tombol submit
document.getElementById('updateButton').addEventListener('click', updateProductStatus);
