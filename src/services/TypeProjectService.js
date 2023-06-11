import axios from "axios";
import authHeader from "./auth-header";

const TYPEPROJECT_API_BASEURL = "https://localhost:7094/api/TypeProjects";

class TypeProjectService {

    getTypeProjects() {
        return axios.get(TYPEPROJECT_API_BASEURL, { headers: authHeader() });
    }

    createTypeProject(typeproject){
        return axios.post(TYPEPROJECT_API_BASEURL, typeproject, { headers: authHeader() });
    }

    getTypeProjectById(typeproject_id){
        return axios.get(TYPEPROJECT_API_BASEURL + '/' + typeproject_id, { headers: authHeader() });
    }

    updateTypeProject(typeproject){
        return axios.put(TYPEPROJECT_API_BASEURL, typeproject, { headers: authHeader() });
    }

    deleteTypeProject(typeproject_id){
        return axios.delete(TYPEPROJECT_API_BASEURL + '?id=' + typeproject_id, { headers: authHeader() });
    }
}

export default new TypeProjectService()