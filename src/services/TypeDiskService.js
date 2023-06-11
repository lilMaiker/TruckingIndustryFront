import axios from "axios";
import authHeader from "./auth-header";

const TYPEDISK_API_BASEURL = "https://localhost:7094/api/TypeDisk";

class TypeDiskService {

    getTypeDisk() {
        return axios.get(TYPEDISK_API_BASEURL, { headers: authHeader() });
    }

    createTypeDisk(typedisk){
        return axios.post(TYPEDISK_API_BASEURL, typedisk, { headers: authHeader() });
    }

    getTypeDiskById(typedisk_id){
        return axios.get(TYPEDISK_API_BASEURL + '/' + typedisk_id, { headers: authHeader() });
    }

    updateTypeDisk(typedisk){
        return axios.put(TYPEDISK_API_BASEURL, typedisk, { headers: authHeader() });
    }

    deleteTypeDisk(typedisk_id){
        return axios.delete(TYPEDISK_API_BASEURL + '?id=' + typedisk_id, { headers: authHeader() });
    }
}

export default new TypeDiskService()