import axios from "axios";
import { BASE_URL } from "../constants/constants";

axios.defaults.baseURL = BASE_URL;

export default axios;
