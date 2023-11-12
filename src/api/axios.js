import axios from "axios";
export default axios.create({  
  baseURL: "https://puzzled-beanie-goat.cyclic.app/api/v1",
  // baseURL: "http://localhost:4000/api/v1",
});
