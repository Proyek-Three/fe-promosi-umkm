import { get } from "https://bukulapak.github.io/api/process.js";
import { isiData } from "./controller/edit_category.js";
import { urlFetch } from "./config/url_get_detail_category.js";
get(urlFetch, isiData);