import { baseService } from './base';

const baseUrl = '/pictures';

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

const getAllByTitle = async (title) => {
  return await 
    baseService.get(`${baseUrl}/by_tilte/${title}`);
    //.then((res) => res.data);   
}

const create = async (data) => {
  return await 
    baseService.post(`${baseUrl}`,data);
}

const update = async (id, data) => {
  return await 
    baseService.put(`${baseUrl}/${id}`, data);
}


// prefixed with underscored because delete is a reserved word in javascript
const _delete = async (id) => {
  return await 
    baseService.delete(`${baseUrl}/${id}`);
}

const deleteAll = async (id) => {
  return await 
    baseService.delete(`${baseUrl}`);
}


export const pictureService = {
  getAll,
  getById,
  getAllByTitle,
  create,
  update,
  delete: _delete,
  deleteAll
};