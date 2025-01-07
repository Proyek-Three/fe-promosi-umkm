import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllCategory } from "./controller/get_category.js";
import { urlAPI } from "./config/url_product.js";
get(urlAPI, GetAllCategory);