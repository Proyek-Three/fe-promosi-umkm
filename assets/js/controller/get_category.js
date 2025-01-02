import { addInner } from "https://bukulapak.github.io/element/process.js";
// import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "../temp/table_category.js";

export function GetAllCategory(results) {

    const hasil = results.forEach(isiRow);
    console.log(hasil);
}

function isiRow(value) {
    let content =
        isiTabel.replace("#CATEGORYNAME#", value.category_name)
            .replace("#IDEDIT#", value._id)
            .replace("#IDDELETE#", value._id)    
    addInner("iniTabel", content);
}