import axios from 'axios';

const http = axios.create({
   baseURL:'https://jpnc1695nodeapi.herokuapp.com/'
})

export default http