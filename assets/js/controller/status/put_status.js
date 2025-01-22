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
        alert('Product ID tidak ditemukan di URL.');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/product/${productId}`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch product data. Error: ${errorText}`);
        }

        const product = await response.json();
        console.log('Fetched Product Data:', product); // Debug data produk

        const statusSelect = document.getElementById('status');
        if (statusSelect) {
            // Isi dropdown dengan status produk saat ini
            statusSelect.value = product.status.status === 'Accepted' ? 'accepted' : 'rejected';
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
    const productId = new URLSearchParams(window.location.search).get('productId');
    const newStatus = document.getElementById('status').value;

    console.log('Selected Status:', newStatus);  // Tambahkan ini untuk memeriksa nilai newStatus

    if (!productId || !newStatus) {
        alert('Product ID atau status baru tidak ditemukan.');
        return;
    }

    // Ambil token dari cookie
    const token = getCookie('token'); // Pastikan nama cookie token sesuai dengan yang ada
    if (!token) {
        alert('Authentication token is missing. Please log in again.');
        return;
    }

    // Mapping status yang dipilih dengan ObjectID yang sesuai
    const statusMapping = {
        'accepted': '67811f31a6ffe1a1bca38c12',
        'rejected': '67811f40a6ffe1a1bca38c13'
    };

    const statusId = statusMapping[newStatus];
    if (!statusId) {
        alert('Invalid status selected.');
        return;
    }

    // Siapkan data untuk dikirim
    const dataToSend = {
        status_id: statusId // Kirim status_id sebagai ObjectID
    };

    try {
        const response = await fetch(`${baseURL}/products/${productId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Sertakan token di header
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error detail dari API:", errorResponse);
            throw new Error(errorResponse.message || 'Gagal memperbarui status produk.');
        }

        const updatedProduct = await response.json();
        alert('Status produk berhasil diperbarui!');
        console.log('Produk yang diperbarui:', updatedProduct);
    } catch (error) {
        console.error("Error saat memperbarui status produk:", error);
        alert(`Terjadi kesalahan: ${error.message}`);
    }
}

// Panggil fungsi fetchProductData saat halaman dimuat untuk mengisi dropdown
fetchProductData();

// Event listener untuk tombol submit
document.getElementById('updateButton').addEventListener('click', updateProductStatus);
