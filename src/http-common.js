import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8020/api",
  headers: {
    "Content-type": "application/json",
    "ApiKey" : "test1234"
  }
});