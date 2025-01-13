import { get } from "https://bukulapak.github.io/api/process.js";
import { isiData } from "./controller/category/edit_category.js";
import { urlFetch } from "./config/category/url_get_detail_category.js";
get(urlFetch, isiData);