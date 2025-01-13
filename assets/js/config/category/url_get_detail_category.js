//Mendapatkan parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const categoryId = urlParams.get("categoryId");

export let urlFetch = "https://bp-promosi-umkm-0fd00e17451e.herokuapp.com/category/" + categoryId;