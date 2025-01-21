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
            throw new Error("Failed to fetch product data");
        }

        const product = await response.json();
        const statusSelect = document.getElementById('status');
        if (statusSelect) {
            statusSelect.value = product.status === 'accepted' ? 'accepted' : 'rejected';
        } else {
            console.error('Status dropdown not found');
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
}

// Fungsi untuk memperbarui status produk
async function updateProductStatus() {
    const status = document.getElementById('status').value;
    const productId = new URLSearchParams(window.location.search).get('productId');

    if (!status) {
        alert('Please select a status.');
        return;
    }

    if (!productId) {
        alert('Product ID is missing.');
        return;
    }

    const token = getCookie('token');  // Perbaikan: gunakan nama cookie 'token'
    console.log('Token:', token);  // Debug untuk memastikan token terbaca

    if (!token) {
        alert('Unauthorized. Please log in first.');
        return;
    }

    try {
        const response = await fetch(`${baseURL}/update/product/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Sertakan token di header Authorization
            },
            body: JSON.stringify({ status: status }),
        });

        if (!response.ok) {
            throw new Error("Failed to update product status");
        }

        const updatedProduct = await response.json();
        alert('Product status updated successfully!');
        console.log('Updated Product:', updatedProduct);
    } catch (error) {
        console.error("Error updating product status:", error);
    }
}

// Panggil fungsi fetchProductData saat halaman dimuat untuk mengisi dropdown
fetchProductData();

// Event listener untuk tombol submit
document.getElementById('updateButton').addEventListener('click', updateProductStatus);
