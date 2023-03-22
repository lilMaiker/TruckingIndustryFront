import axios from "axios";
import authHeader from "./auth-header";

const CLIENT_API_BASEURL = "https://localhost:7232/api/Clients";

class ClientService {

    async getClient() {
        return axios.get(CLIENT_API_BASEURL, { headers: authHeader() });
    }

    async createClient(client){
        return axios.post(CLIENT_API_BASEURL, client, { headers: authHeader() });
    }

    async getClientById(client_id){
        return axios.get(CLIENT_API_BASEURL + '/' + client_id, { headers: authHeader() });
    }

    async updateClient(client){
        return axios.put(CLIENT_API_BASEURL, client, { headers: authHeader() });
    }

    async deleteClient(client_id){
        return axios.delete(CLIENT_API_BASEURL + '?id=' + client_id, { headers: authHeader() });
    }
}

export default new ClientService()