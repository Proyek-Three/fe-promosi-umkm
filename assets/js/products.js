// Product Modal
  function showModal(button) {
    const product = button.closest('.product-item');
    const modal = document.getElementById('productModal');

    // Update modal content
    document.getElementById('modalProductName').textContent = product.getAttribute('data-name');
    document.getElementById('modalStoreName').textContent = product.getAttribute('data-store');
    document.getElementById('modalPrice').textContent = product.getAttribute('data-price');
    document.getElementById('modalDescription').textContent = product.getAttribute('data-description');
    document.getElementById('modalAddress').textContent = product.getAttribute('data-address');
    document.getElementById('modalProductImage').src = product.querySelector('img').src;

    // Show modal with animation
    modal.classList.remove('hidden');
    setTimeout(() => modal.querySelector('.transform').classList.remove('scale-95'));
  }

  function closeModal() {
    const modal = document.getElementById('productModal');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
