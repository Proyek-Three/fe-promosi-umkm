 // Fungsi untuk mengubah warna dropdown berdasarkan nilai yang dipilih
 function updateDropdownColor(selectElement) {
    // Hapus kelas warna sebelumnya
    selectElement.classList.remove('bg-green-100', 'text-green-600', 'bg-red-100', 'text-red-600');

    // Jika opsi yang dipilih bukan opsi default
    if (selectElement.value === "diterima") {
      selectElement.classList.add('bg-green-100', 'text-green-600');
    } else if (selectElement.value === "ditolak") {
      selectElement.classList.add('bg-red-100', 'text-red-600');
    }
  }