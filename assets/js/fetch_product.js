import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllProduct } from "./controller/get_product.js";
import { urlAPI } from "./config/url_product.js";
get(urlAPI, GetAllProduct);

