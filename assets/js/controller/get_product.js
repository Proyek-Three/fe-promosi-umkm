import { addInner } from "https://bukulapak.github.io/element/process.js";
// import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "../temp/table_product.js";

export function GetAllProduct(results) {

    // const hasil = results.forEach(isiRow);
    // console.log(hasil);
    results.forEach(isiRow);
}

function isiRow(value) {
    let content =
        isiTabel.replace("#PRODUCTNAME#", value.product_name)
            .replace("#CATEGORYNAME#", value.category.category_name)
            .replace("#DESCRIPTION#", value.description)
            .replace("#PRICE#", value.price)
            .replace("#IMAGE#", value.image)
            .replace("#IDHAPUS#", value.id)    
    addInner("iniTabel", content);
}