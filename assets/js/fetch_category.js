import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllCategory } from "./controller/get_category.js";
import { urlAPI } from "./config/url_post_category.js";
get(urlAPI, GetAllCategory);