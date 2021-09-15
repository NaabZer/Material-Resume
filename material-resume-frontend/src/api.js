import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true


let api_instance =  axios.create({
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
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  baseURL: 'http://localhost:81/api'
});
console.log(api_instance.defaults)


export default api_instance;
