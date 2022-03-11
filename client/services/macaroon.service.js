import { baseService } from './base';

const baseUrl = `${process.env.API_SERVER_URL}/macaroons`;

const getAll = async () => {
  return await 
    baseService.get(`${baseUrl}`);   
}

const getById = async (id) => {
  return await 
    baseService.get(`${baseUrl}/${id}`)
    //.then((res) => res.data);
}

const getAllByType = async (type) => {
  return await 
    baseService.get(`${baseUrl}/by_type/${type}`);
    //.then((res) => res.data);   
}

const create = async (data) => {
  return await 
    baseService.post(`${baseUrl}`,data);
}

const update = async (id, data) => {
  return await 
    baseService.put(`${baseUrl}/datas/${id}`, data
  );
}

const _delete = async (id) => {
  return await 
    baseService.delete(`${baseUrl}/datas/${id}`
  );
}

const deleteAll = async (id) => {
  return await 
    baseService.delete(`${baseUrl}`);
}

export const macaroonService = {
  getAll,
  getById,
  getAllByType,
  create,
  update,
  delete: _delete,
  deleteAll
};