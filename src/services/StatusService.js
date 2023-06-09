import axios from "axios";
import authHeader from "./auth-header";

const STATUS_API_BASEURL = "https://localhost:7232/api/Status";

class StatusService {

    async getStatus() {
        return axios.get(STATUS_API_BASEURL, { headers: authHeader() });
    }

    async createStatus(status){
        return axios.post(STATUS_API_BASEURL, status, { headers: authHeader() });
    }

    async getStatusById(status_id){
        return axios.get(STATUS_API_BASEURL + '/' + status_id, { headers: authHeader() });
    }

    async updateStatus(status){
        return axios.put(STATUS_API_BASEURL, status, { headers: authHeader() });
    }

    async deleteStatus(status_id){
        return axios.delete(STATUS_API_BASEURL + '?id=' + status_id, { headers: authHeader() });
    }
}

export default new StatusService()