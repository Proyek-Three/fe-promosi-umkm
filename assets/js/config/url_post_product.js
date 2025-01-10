export let urlPOST = "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/insert/product"

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.reload(); //reload halaman setelah klik ok pada alert
}