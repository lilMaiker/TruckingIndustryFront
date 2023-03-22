import axios from "axios";
import authHeader from "./auth-header";

const EMPLOYEE_API_BASEURL = "https://localhost:7232/api/Employees";

class EmployeeService {

    async getEmployees() {
        return axios.get(EMPLOYEE_API_BASEURL, { headers: authHeader() });
    }

    async createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASEURL, employee, { headers: authHeader() });
    }

    async getEmployeeById(employee_id){
        return axios.get(EMPLOYEE_API_BASEURL + '/' + employee_id, { headers: authHeader() });
    }

    async updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASEURL, employee, { headers: authHeader() });
    }

    async deleteEmployee(employee_id){
        return axios.delete(EMPLOYEE_API_BASEURL + '?id=' + employee_id, { headers: authHeader() });
    }
}

export default new EmployeeService()