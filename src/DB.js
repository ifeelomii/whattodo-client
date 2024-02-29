import axios from "axios";
let baseUrl = "http://localhost:8080/activities";
class DB {
  getFromList() {
    return axios.get(baseUrl);
  }
  addInList(activity) {
    // console.log(activity)
    return axios.post(baseUrl, activity);
  }
}

export default new DB();
