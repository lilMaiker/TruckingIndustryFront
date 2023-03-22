import axios from "axios";
import authHeader from "./auth-header";

const FOUNDATION_API_BASEURL = "https://localhost:7232/api/Foundation";

class FoundationService {

    async getFoundation() {
        return axios.get(FOUNDATION_API_BASEURL, { headers: authHeader() });
    }

    createFoundation(foundation){
        return axios.post(FOUNDATION_API_BASEURL, foundation, { headers: authHeader() });
    }

    getFoundationById(foundation_id){
        return axios.get(FOUNDATION_API_BASEURL + '/' + foundation_id, { headers: authHeader() });
    }

    updateFoundation(foundation){
        return axios.put(FOUNDATION_API_BASEURL, foundation, { headers: authHeader() });
    }

    deleteFoundation(foundation_id){
        return axios.delete(FOUNDATION_API_BASEURL + '?id=' + foundation_id, { headers: authHeader() });
    }
}

export default new FoundationService()