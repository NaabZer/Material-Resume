import axios from 'axios';

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
  baseURL: 'http://localhost:8000'
});

export default api_instance;
