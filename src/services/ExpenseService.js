import axios from "axios";
import authHeader from "./auth-header";

const EXPENSE_API_BASEURL = "https://localhost:7232/api/Expenses";

class ExpenseService {

    async getExpense() {
        return axios.get(EXPENSE_API_BASEURL, { headers: authHeader() });
    }

    async createExpense(expense){
        return axios.post(EXPENSE_API_BASEURL, expense, { headers: authHeader() });
    }

    async getExpenseById(expense_id){
        return axios.get(EXPENSE_API_BASEURL + '/GetById/' + expense_id, { headers: authHeader() });
    }

    async getExpenseByIdBid(BidId){
        return axios.get(EXPENSE_API_BASEURL + '/GetByIdBid/' + BidId, { headers: authHeader() });
    }

    async updateExpense(expense){
        return axios.put(EXPENSE_API_BASEURL, expense, { headers: authHeader() });
    }

    async deleteExpense(expense_id){
        return axios.delete(EXPENSE_API_BASEURL + '?id=' + expense_id, { headers: authHeader() });
    }
}

export default new ExpenseService()