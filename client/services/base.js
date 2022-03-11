import axios from 'axios'

const baseService = axios.create({
  baseURL: `${process.env.API_SERVER_URL}`,
  
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

baseService.interceptors.response.use(
  function (response) {
    // Return unwrapped response ---the "body" of it
    return response.data
  },
  function (error) {
    // TODO: Do proper error handling here (logout user, etc)
    console.error("ERROR in AXIOS CALL")
  }
)

export { baseService }