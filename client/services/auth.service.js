import { baseService } from './base';
import axios from 'axios'

const baseUrl = `${process.env.API_SERVER_URL}/auth`;

const login = async () => {
  return await 
    baseService.get(`${baseUrl}/request_macaroon`)
    //.then((res) => res.data);  
}

const logout = async () => {
  return await 
    baseService.get(`${baseUrl}/logout`);
    
}

const requestMacaroon = async () => {
  return await 
    baseService.get(`${baseUrl}/request_macaroon`)
}

const verifyAccess = async (id) => {
  return await 
    axios.get(`${baseUrl}/${id}`);
    
}

export const authService = {
  login,
  logout,
  requestMacaroon,
  verifyAccess
};