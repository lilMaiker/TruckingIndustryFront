import axios from "axios";
import authHeader from "./auth-header";

const EXPENSE_API_BASEURL = "https://localhost:7232/api/Expenses";

class ExpenseService {

    getExpense() {
        return axios.get(EXPENSE_API_BASEURL, { headers: authHeader() });
    }

    createExpense(expense){
        return axios.post(EXPENSE_API_BASEURL, expense, { headers: authHeader() });
    }

    getExpenseById(expense_id){
        return axios.get(EXPENSE_API_BASEURL + '/GetById/' + expense_id, { headers: authHeader() });
    }

    getExpenseByIdBid(BidId){
        return axios.get(EXPENSE_API_BASEURL + '/GetByIdBid/' + BidId, { headers: authHeader() });
    }

    updateExpense(expense){
        return axios.put(EXPENSE_API_BASEURL, expense, { headers: authHeader() });
    }

    deleteExpense(expense_id){
        return axios.delete(EXPENSE_API_BASEURL + '?id=' + expense_id, { headers: authHeader() });
    }
}

export default new ExpenseService()