import axios from "axios";
import { URL_REQUESTAXIOS } from "./urlGetDataAPI";

// Cấu hình chung cho axios
const axiosClient = axios.create({
    baseURL: URL_REQUESTAXIOS,
    headers: {
        "content-type": "application/json",
    },
});

//Xử lý response trả về
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return error.response;
    }
);

export default axiosClient;
