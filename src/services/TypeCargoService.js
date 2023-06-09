import axios from "axios";
import authHeader from "./auth-header";

const TYPECARGO_API_BASEURL = "https://localhost:7232/api/TypeCargo";

class TypeCargoService {

    async getTypeCargos() {
        return axios.get(TYPECARGO_API_BASEURL, { headers: authHeader() });
    }

    async createTypeCargo(typecargo){
        return axios.post(TYPECARGO_API_BASEURL, typecargo, { headers: authHeader() });
    }

    async getTypeCargoById(typecargo_id){
        return axios.get(TYPECARGO_API_BASEURL + '/' + typecargo_id, { headers: authHeader() });
    }

    async updateTypeCargo(typecargo){
        return axios.put(TYPECARGO_API_BASEURL, typecargo, { headers: authHeader() });
    }

    async deleteTypeCargo(typecargo_id){
        return axios.delete(TYPECARGO_API_BASEURL + '?id=' + typecargo_id, { headers: authHeader() });
    }
}

export default new TypeCargoService()