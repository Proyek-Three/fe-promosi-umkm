function filterProducts(selectedCategory) {
    // Remove 'active' class from all filter buttons
    document.querySelectorAll('.filter-category').forEach((el) => {
      el.classList.remove('active');
    });

    // Add 'active' class to the clicked filter button
    selectedCategory.classList.add('active');

    // Get the selected category
    const category = selectedCategory.getAttribute('data-category');
    const products = document.querySelectorAll('.product-item');

    // Filter products
    products.forEach((product) => {
      const productCategory = product.getAttribute('data-category');

      if (category === 'all' || productCategory === category) {
        product.classList.add('show'); // Show matched products
      } else {
        product.classList.remove('show'); // Hide unmatched products
      }
    });
  }

  // Initialize with "All" filter
  document.addEventListener('DOMContentLoaded', () => {
    filterProducts(document.querySelector('.filter-category.active'));
  });