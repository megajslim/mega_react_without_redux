import axios from "axios";

export default axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api`,
  headers: {
    "Content-type": "application/json",
    "ApiKey" : "test1234"
  }
});
