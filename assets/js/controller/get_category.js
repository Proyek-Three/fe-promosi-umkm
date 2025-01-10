import { addInner } from "https://bukulapak.github.io/element/process.js";
// import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "../temp/table_category.js";

export function GetAllCategory(results) {

    // const hasil = results.forEach(isiRow);
    // console.log(hasil);
    results.forEach(isiRow);
}

function isiRow(value) {
    let content =
        isiTabel.replace("#CATEGORYNAME#", value.category_name)
            .replace("#IDEDIT#", value.id)
            .replace("#IDHAPUS#", value.id)    
    addInner("iniTabel", content);
}