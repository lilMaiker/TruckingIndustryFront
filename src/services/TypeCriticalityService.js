import axios from "axios";
import authHeader from "./auth-header";

const TYPECRITICALITY_API_BASEURL = "https://localhost:7094/api/TypeCriticality";

class TypeCriticalityService {

    getTypeCriticality() {
        return axios.get(TYPECRITICALITY_API_BASEURL, { headers: authHeader() });
    }

    createTypeCriticality(typecriticality){
        return axios.post(TYPECRITICALITY_API_BASEURL, typecriticality, { headers: authHeader() });
    }

    getTypeCriticalityById(typecriticality_id){
        return axios.get(TYPECRITICALITY_API_BASEURL + '/' + typecriticality_id, { headers: authHeader() });
    }

    updateTypeCriticality(typecriticality){
        return axios.put(TYPECRITICALITY_API_BASEURL, typecriticality, { headers: authHeader() });
    }

    deleteTypeCriticality(typecriticality_id){
        return axios.delete(TYPECRITICALITY_API_BASEURL + '?id=' + typecriticality_id, { headers: authHeader() });
    }
}

export default new TypeCriticalityService()