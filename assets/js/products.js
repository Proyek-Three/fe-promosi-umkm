fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product")
  .then((response) => response.json())
  .then((products) => {
    return fetch("https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/productnumber")
      .then((response) => response.json())
      .then((phoneNumbers) => {
        console.log("Fetched phone numbers:", phoneNumbers);
        const phoneMap = new Map();
        phoneNumbers.forEach(phone => {
          phoneMap.set(phone._id, phone.phone_number);
        });

        const acceptedProducts = products.filter(
          (product) => product.status && product.status.status === "Accepted"
        );
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = ""; // Clear previous content

        acceptedProducts.forEach((product) => {
          console.log("Processing product:", product);
          
          const userId = product.user && product.user._id ? product.user._id : null;
          console.log("Looking for phone number with user ID:", userId);
          
          const phoneNumber = userId ? phoneMap.get(userId) || "N/A" : "N/A";
          console.log("Assigned phone number:", phoneNumber);

          const productElement = `
            <div
              class="bg-white rounded-lg shadow-lg p-8 product-item"
              data-category="${product.category ? product.category.category_name.toLowerCase() : 'Unknown'}" 
              data-name="${product.product_name}"
              data-store="${product.user && product.user.store ? product.user.store.store_name : 'Unknown'}"
              data-phone="${phoneNumber}"
              data-price="Rp. ${product.price ? product.price.toLocaleString() : '0'}"
              data-description="${product.description}"
              data-address="${product.user && product.user.store ? product.user.store.store_name : 'Unknown'}"
            >
              <img
                class="object-cover w-full h-48 rounded-t-lg"
                src="${product.image}"
                alt="${product.product_name}"
              />
              <h3 class="text-xl font-bold text-gray-900 mt-4">
                ${product.product_name}
              </h3>
              <h4 class="text-gray-500 font-bold text-sm mt-2">
                Rp. ${product.price ? product.price.toLocaleString() : '0'}
              </h4>
              <p class="text-gray-500 text-sm text-justify mt-2">
                ${product.description}
              </p>
              <button
                type="button"
                class="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onclick="showModal(this)"
              >
                Product Details
              </button>
            </div>
          `;
          productContainer.innerHTML += productElement;
        });
      });
  })
  .catch((error) => console.error("Error fetching products:", error));

function showModal(button) {
  const productItem = button.closest(".product-item");
  const productName = productItem.dataset.name;
  const productImage = productItem.querySelector("img").src;
  const storeName = productItem.dataset.store;
  const phoneNumber = productItem.dataset.phone;
  const price = productItem.dataset.price;
  const description = productItem.dataset.description;
  const address = productItem.dataset.address;

  document.getElementById("modalProductName").textContent = productName;
  document.getElementById("modalProductImage").src = productImage;
  document.getElementById("modalStoreName").textContent = storeName;
  document.getElementById("modalPhoneNumber").textContent = phoneNumber;
  document.getElementById("modalPrice").textContent = price;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("modalAddress").textContent = address;

  const modal = document.getElementById("productModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.classList.remove("scale-95");
  modal.classList.add("scale-100");
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modal.classList.add("scale-95");
  modal.classList.remove("scale-100");
}
