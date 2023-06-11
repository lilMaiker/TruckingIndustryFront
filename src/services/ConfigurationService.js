import axios from "axios";
import authHeader from "./auth-header";

const CONFIGURATION_API_BASEURL = "https://localhost:7094/api/Configuration";

class ConfigurationService {

    getConfiguration() {
        return axios.get(CONFIGURATION_API_BASEURL, { headers: authHeader() });
    }

    createConfiguration(configuration){
        return axios.post(CONFIGURATION_API_BASEURL, configuration, { headers: authHeader() });
    }

    getConfigurationById(configuration_id){
        return axios.get(CONFIGURATION_API_BASEURL + '/' + configuration_id, { headers: authHeader() });
    }

    updateConfiguration(configuration){
        return axios.put(CONFIGURATION_API_BASEURL, configuration, { headers: authHeader() });
    }

    deleteConfiguration(configuration_id){
        return axios.delete(CONFIGURATION_API_BASEURL + '?id=' + configuration_id, { headers: authHeader() });
    }
}

export default new ConfigurationService()