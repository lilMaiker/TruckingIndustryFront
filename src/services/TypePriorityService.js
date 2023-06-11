import axios from "axios";
import authHeader from "./auth-header";

const TYPEPRIORITY_API_BASEURL = "https://localhost:7094/api/TypePriority";

class TypePriorityService {

    getTypePrioritys() {
        return axios.get(TYPEPRIORITY_API_BASEURL, { headers: authHeader() });
    }

    createTypePriority(typepriority){
        return axios.post(TYPEPRIORITY_API_BASEURL, typepriority, { headers: authHeader() });
    }

    getTypePriorityById(typepriority_id){
        return axios.get(TYPEPRIORITY_API_BASEURL + '/' + typepriority_id, { headers: authHeader() });
    }

    updateTypePriority(typepriority){
        return axios.put(TYPEPRIORITY_API_BASEURL, typepriority, { headers: authHeader() });
    }

    deleteTypePriority(typepriority_id){
        return axios.delete(TYPEPRIORITY_API_BASEURL + '?id=' + typepriority_id, { headers: authHeader() });
    }
}

export default new TypePriorityService()