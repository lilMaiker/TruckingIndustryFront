import axios from "axios";

const API_URL = "https://localhost:7232/api/Accounts/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", { 
        email, password 
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userGoogle");
  }

  register(email, password) {
    return axios.post(API_URL + "Registration", {
      email,
      password
    });
  }

  ExternalAuth(googleCreadetionals){
    return axios.post(API_URL + 'ExternalLogin', googleCreadetionals);  
  }

  getCurrentUserGoogle() {
    return JSON.parse(localStorage.getItem('userGoogle'));;
  }
}

export default new AuthService();
