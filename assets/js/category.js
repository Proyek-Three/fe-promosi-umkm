            // Ambil elemen <select>
            const categorySelect = document.getElementById("category_name");

            // Fungsi untuk mendapatkan data dari API
            async function fetchCategories() {
              try {
                const response = await fetch(
                  "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category"
                );
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const categories = await response.json();

                // Tambahkan opsi ke elemen <select>
                categories.forEach((category) => {
                  const option = document.createElement("option");
                  option.value = category.id; // Gunakan id sebagai nilai
                  option.textContent = category.category_name; // Tampilkan nama kategori
                  categorySelect.appendChild(option);
                });
              } catch (error) {
                console.error("Gagal mengambil data kategori:", error);
              }
            }

            // Panggil fungsi untuk fetch data
            fetchCategories();