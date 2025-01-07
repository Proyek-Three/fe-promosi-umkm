import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllProduct } from "./controller/get_category.js";
import { urlAPI } from "./config/url_category.js";
get(urlAPI, GetAllProduct);