import axios from "axios";

const api = axios.create({
  baseURL: "https://9gag.com/v1",
});

export { api };
