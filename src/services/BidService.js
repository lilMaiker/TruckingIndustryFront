import axios from "axios";
import authHeader from "./auth-header";

const BID_API_BASEURL = "https://localhost:7232/api/Bids";

class BidService {

    async getBid() {
        return axios.get(BID_API_BASEURL, { headers: authHeader() });
    }

    async createBid(bid){
        return axios.post(BID_API_BASEURL, bid, { headers: authHeader() });
    }

    async getBidById(bid_id){
        return axios.get(BID_API_BASEURL + '/' + bid_id, { headers: authHeader() });
    }

    async updateBid(bid){
        return axios.put(BID_API_BASEURL, bid, { headers: authHeader() });
    }

    async deleteBid(bid_id){
        return axios.delete(BID_API_BASEURL + '?id=' + bid_id, { headers: authHeader() });
    }
}

export default new BidService()