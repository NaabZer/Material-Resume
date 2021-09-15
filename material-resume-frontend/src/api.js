import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

let api_instance =  axios.create({
  mode: 'cors',
  headers: {
    post:{
      'Content-Type': 'application/json'
    },
    patch:{
      'Content-Type': 'application/json'
    },
    put:{
      'Content-Type': 'application/json'
    }
  },
  baseURL: 'http://localhost:81/api'
});

export default api_instance;
