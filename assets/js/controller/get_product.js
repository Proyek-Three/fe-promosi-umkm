import { addInner } from "https://bukulapak.github.io/element/process.js";
// import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "../temp/table_product.js";

export function GetAllProduct(results) {

    // const hasil = results.forEach(isiRow);
    // console.log(hasil);
    results.forEach(isiRow);
}

function formatCurrency(amount) {
    // Convert amount to number and format with thousands separators and "Rp."
    return `Rp. ${parseFloat(amount).toLocaleString('id-ID')}`;
  }

function isiRow(value) {
    let content =
        isiTabel.replace("#PRODUCTNAME#", value.product_name)
            .replace("#CATEGORYNAME#", value.category.category_name)
            .replace("#DESCRIPTION#", value.description)
            .replace("#STORENAME#", value.user.store.store_name)
            .replace("#PRICE#", formatCurrency(value.price) || "Rp. 0,00")
            .replace("#IMAGE#", value.image)
            .replace("#STATUS#", value.status.status)
            .replace("#IDEDIT#", value.id)    
            .replace("#IDHAPUS#", value.id)    
    addInner("iniTabel", content);
}







