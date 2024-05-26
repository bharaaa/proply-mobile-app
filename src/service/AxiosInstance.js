import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://proply-backend-jjwesamxia-as.a.run.app/api/v1",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
})

export default axiosInstance