  // Script untuk membuka modal
  function openModal() {
    const modal = document.getElementById("crud-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

// Script untuk menutup modal
function closeModal() {
    const modal = document.getElementById("crud-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}