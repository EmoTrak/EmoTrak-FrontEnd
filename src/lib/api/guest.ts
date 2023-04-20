import axios from "axios";

const guest = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default guest;
