import axios from "axios";
import authHeader from "./auth-header";

const ROUTE_API_BASEURL = "https://localhost:7232/api/Route";

class RouteService {

    async getRoute() {
        return axios.get(ROUTE_API_BASEURL, { headers: authHeader() });
    }

    async createRoute(route){
        return axios.post(ROUTE_API_BASEURL, route, { headers: authHeader() });
    }

    async getRouteById(route_id){
        return axios.get(ROUTE_API_BASEURL + '/GetById/' + route_id, { headers: authHeader() });
    }

    async getRouteByIdBid(BidId){
        return axios.get(ROUTE_API_BASEURL + '/GetByIdBid/' + BidId, { headers: authHeader() });
    }

    async updateRoute(route){
        return axios.put(ROUTE_API_BASEURL, route, { headers: authHeader() });
    }

    async deleteRoute(route_id){
        return axios.delete(ROUTE_API_BASEURL + '?id=' + route_id, { headers: authHeader() });
    }
}

export default new RouteService()