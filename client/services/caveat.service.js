import { baseService } from './base';

const baseUrl = '/caveats';

const getAll = async () => {
  return await 
    baseService.get(`${baseUrl}`);
    //.then((res) => res.data);   
}

const getById = async (id) => {
  return await 
    baseService.get(`${baseUrl}/${id}`);
    //.then((res) => res.data);
}

const getAllByLocation = async (location) => {
  return await 
    baseService.get(`${baseUrl}/by_location/${location}`);
    //.then((res) => res.data);   
}

const create = async (data) => {
  return await 
    baseService.post(`${baseUrl}`,data);
}

const createAllInList = async (data) => {
  return await 
    baseService.post(`${baseUrl}/in_list`,data);
}

const update = async (id, data) => {
  return await 
    baseService.put(`${baseUrl}/${id}`, data);
}

const upsertAllInList = async (data) => {
  return await 
    baseService.put(`${baseUrl}/in_list`, data);
}

// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (id) => {
  return await 
    baseService.delete(`${baseUrl}/${id}`);
}

const deleteAllNotIn = async (data) => {
  return await 
    baseService.delete(`${baseUrl}/not_in_list`, data);
}

const deleteAll = async (id) => {
  return await 
    baseService.delete(`${baseUrl}`);
}


export const caveatService = {
  getAll,
  getById,
  getAllByLocation,
  create,
  createAllInList,
  update,
  upsertAllInList,
  delete: _delete,
  deleteAllNotIn,
  deleteAll
};