import axios from "axios";
let baseUrl = "http://localhost:8080/activities";
class DB {
  getFromList() {
    return axios.get(baseUrl);
  }
  addInList(activity) {
    return axios.post(baseUrl + activity);
  }
  updateFromList(activity) {
    return axios.put(baseUrl + activity.id, activity);
  }
  removeFromList(id) {
    return axios.delete(baseUrl + id);
  }
}

export default new DB();
