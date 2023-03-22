import axios from "axios";
import authHeader from "./auth-header";

const POSITION_API_BASEURL = "https://localhost:7232/api/Positions";

class PositionService {

    getPositions() {
        return axios.get(POSITION_API_BASEURL, { headers: authHeader() });
    }

    createPosition(position){
        return axios.post(POSITION_API_BASEURL, position, { headers: authHeader() });
    }

    getPositionById(position_id){
        return axios.get(POSITION_API_BASEURL + '/' + position_id, { headers: authHeader() });
    }

    updatePosition(position){
        return axios.put(POSITION_API_BASEURL, position, { headers: authHeader() });
    }

    deletePosition(position_id){
        return axios.delete(POSITION_API_BASEURL + '?id=' + position_id, { headers: authHeader() });
    }
}

export default new PositionService()