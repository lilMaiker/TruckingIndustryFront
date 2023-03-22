import axios from "axios";
import authHeader from "./auth-header";

const RISKS_API_BASEURL = "http://localhost:8080/api/R/risks";

class RisksService {
        
    async getRisks() {
        return axios.get(RISKS_API_BASEURL, { headers: authHeader() });
    }

    async createRisks(Risks){
        return axios.post(RISKS_API_BASEURL, Risks, { headers: authHeader() });
    }

    async getRisksById(Risks_id){
        return axios.get(RISKS_API_BASEURL + '/' + Risks_id, { headers: authHeader() });
    }

    async updateRisks(Risks, Risks_id){
        return axios.put(RISKS_API_BASEURL + '/' + Risks_id, Risks, { headers: authHeader() });
    }

    async deleteRisks(Risks_id){
        return axios.delete(RISKS_API_BASEURL + '/' + Risks_id, { headers: authHeader() });
    }
}

export default new RisksService()
