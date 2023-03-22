import axios from "axios";
import authHeader from "./auth-header";

const RISKS_API_BASEURL = "http://localhost:8080/api/R/risks";

class RisksService {
        
    getRisks() {
        return axios.get(RISKS_API_BASEURL, { headers: authHeader() });
    }

    createRisks(Risks){
        return axios.post(RISKS_API_BASEURL, Risks, { headers: authHeader() });
    }

    getRisksById(Risks_id){
        return axios.get(RISKS_API_BASEURL + '/' + Risks_id, { headers: authHeader() });
    }

    updateRisks(Risks, Risks_id){
        return axios.put(RISKS_API_BASEURL + '/' + Risks_id, Risks, { headers: authHeader() });
    }

    deleteRisks(Risks_id){
        return axios.delete(RISKS_API_BASEURL + '/' + Risks_id, { headers: authHeader() });
    }
}

export default new RisksService()
