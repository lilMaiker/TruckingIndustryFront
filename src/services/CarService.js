import axios from "axios";
import authHeader from "./auth-header";

const CAR_API_BASEURL = "https://localhost:7232/api/Cars";

class CarService {

    async getCar() {
        return axios.get(CAR_API_BASEURL, { headers: authHeader() });
    }

    async createCar(car){
        return axios.post(CAR_API_BASEURL, car, { headers: authHeader() });
    }

    async getCarById(car_id){
        return axios.get(CAR_API_BASEURL + '/' + car_id, { headers: authHeader() });
    }

    async updateCar(car){
        return axios.put(CAR_API_BASEURL, car, { headers: authHeader() });
    }

    async deleteCar(car_id){
        return axios.delete(CAR_API_BASEURL + '?id=' + car_id, { headers: authHeader() });
    }
}

export default new CarService()