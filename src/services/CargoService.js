import axios from "axios";
import authHeader from "./auth-header";

const CARGO_API_BASEURL = "https://localhost:7232/api/Cargo";

class CargoService {

    async getCargo() {
        return axios.get(CARGO_API_BASEURL, { headers: authHeader() });
    }

    async createCargo(cargo){
        return axios.post(CARGO_API_BASEURL, cargo, { headers: authHeader() });
    }

    async getCargoById(cargo_id){
        return axios.get(CARGO_API_BASEURL + '/GetById/' + cargo_id, { headers: authHeader() });
    }

    async getCargoByIdBid(BidId){
        return axios.get(CARGO_API_BASEURL + '/GetByIdBid/' + BidId, { headers: authHeader() });
    }

    async updateCargo(cargo){
        return axios.put(CARGO_API_BASEURL, cargo, { headers: authHeader() });
    }

    async deleteCargo(cargo_id){
        return axios.delete(CARGO_API_BASEURL + '?id=' + cargo_id, { headers: authHeader() });
    }
}

export default new CargoService()