import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllCategory } from "./controller/category/get_category.js";
import { urlAPI } from "./config/category/url_category.js";
get(urlAPI, GetAllCategory);