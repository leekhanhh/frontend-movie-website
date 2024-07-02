import { TOKEN,BASE_URL } from "../env";
import axios from "axios";
export const clientAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    headers: {'Authorization': `Bearer ${TOKEN}`}
});