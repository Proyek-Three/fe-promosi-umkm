//Mendapatkan parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

export let urlFetch = "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/product/" + productId;