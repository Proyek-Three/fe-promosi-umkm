import { get } from "https://bukulapak.github.io/api/process.js";
import { isiData } from "./controller/edit_product_status.js";
import { urlFetch } from "./config/url_get_detail_product.js";
get(urlFetch, isiData);