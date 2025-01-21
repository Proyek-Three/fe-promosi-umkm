const baseURL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
  ? 'http://127.0.0.1:8080'  // Local API
  : 'https://bp-promosi-umkm-0fd00e17451e.herokuapp.com';  // Deployed API

// Fetch product data and populate the status dropdown
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

// Function to update product status
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

  const token = localStorage.getItem('jwtToken');  // Get the JWT token from localStorage
  
  if (!token) {
    alert('Unauthorized. Please log in first.');
    return;
  }

  try {
    const response = await fetch(`${baseURL}/update/product/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Include token here for authentication
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

// Call the fetchProductData function on page load to populate the dropdown
fetchProductData();

// Event listener for the submit button
document.getElementById('updateButton').addEventListener('click', updateProductStatus);
