import axios from "axios";
import authHeader from "./auth-header";

const PROJECT_API_BASEURL = "https://localhost:7094/api/Projects";

class ProjectService {

    getProject() {
        return axios.get(PROJECT_API_BASEURL, { headers: authHeader() });
    }

    createProject(project){
        return axios.post(PROJECT_API_BASEURL, project, { headers: authHeader() });
    }

    getProjectById(project_id){
        return axios.get(PROJECT_API_BASEURL + '/' + project_id, { headers: authHeader() });
    }

    updateProject(project){
        return axios.put(PROJECT_API_BASEURL, project, { headers: authHeader() });
    }

    deleteProject(project_id){
        return axios.delete(PROJECT_API_BASEURL + '?id=' + project_id, { headers: authHeader() });
    }
}

export default new ProjectService()