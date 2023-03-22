import axios from "axios";
import authHeader from "./auth-header";

const CURRENCY_API_BASEURL = "https://localhost:7232/api/Currency";

class CurrencyService {

    async getCurrencys() {
        return axios.get(CURRENCY_API_BASEURL, { headers: authHeader() });
    }

    createCurrency(currency){
        return axios.post(CURRENCY_API_BASEURL, currency, { headers: authHeader() });
    }

    getCurrencyById(currency_id){
        return axios.get(CURRENCY_API_BASEURL + '/' + currency_id, { headers: authHeader() });
    }

    updateCurrency(currency){
        return axios.put(CURRENCY_API_BASEURL, currency, { headers: authHeader() });
    }

    deleteCurrency(currency_id){
        return axios.delete(CURRENCY_API_BASEURL + '?id=' + currency_id, { headers: authHeader() });
    }
}

export default new CurrencyService()