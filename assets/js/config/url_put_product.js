const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productId');

export let urlPUT = "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/update/product/" + productId;

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.href = "index.html"; //reload halaman setelah klik ok pada alert
}