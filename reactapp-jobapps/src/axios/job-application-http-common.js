import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44301/api/JobApplication",
  headers: {
    "Content-type": "application/json",
  },
});
