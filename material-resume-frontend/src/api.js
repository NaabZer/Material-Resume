import axios from 'axios';

let api_instance =  axios.create({
  mode: 'cors',
  headers: {
    post:{
      'Content-Type': 'application/json'
    }
  },
  baseURL: 'http://localhost:8000'
});

export default api_instance;
