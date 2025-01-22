// Ambil ID produk dari URL
const productId = window.location.pathname.split("/").pop();

// Fungsi untuk mendapatkan data kategori dari API
async function fetchCategories() {
  try {
    const response = await fetch(
      "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category"
    );
    const categories = await response.json();

    // Isi dropdown kategori dengan data kategori
    const categorySelect = document.getElementById("category_name");
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.category_name;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Fungsi untuk mendapatkan data produk
async function fetchProductData() {
  try {
    const response = await fetch(
      `https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product/${productId}`
    );
    const product = await response.json();

    // Isi form dengan data produk
    document.getElementById("product_name").value = product.product_name;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;

    // Pilih kategori yang sesuai dengan produk
    const categorySelect = document.getElementById("category_name");
    categorySelect.value = product.category.id; // Pilih kategori sesuai produk
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Fetch kategori dan data produk saat halaman dimuat
fetchCategories();
// Fetch data produk saat halaman dimuat
fetchProductData();

// Menghandle form submit untuk update data
document
  .getElementById("formEditProduct")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Ambil token dari cookie
    const token = getCookie("token");
    if (!token) {
      alert("No token found. Please log in first.");
      return;
    }

    // Ambil data form
    const productName = document.getElementById("product_name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const categoryName = document.getElementById("category_name").value;
    const image = document.getElementById("image").files[0];

    // Form data untuk dikirim
    const formData = new FormData();
    console.log("formData", formData);
    formData.append("product_name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_name", categoryName);
    if (image) formData.append("image", image);

    try {
      const response = await fetch(
        `https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/update/product/${productId}`,
        {
          method: "PUT", // atau PATCH
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "index.html"; // Redirect after success
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Failed to update product.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the product.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  });

// Fungsi untuk mendapatkan token dari cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
