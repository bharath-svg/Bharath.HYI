import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const paginate = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalCount: data.length,
    hasNext: endIndex < data.length,
    hasPrev: page > 1,
  };
};

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/users');
    return paginate(response.data, page, limit);
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async userData => {
  try {
    const response = await api.post('/users', userData);

    return {...response.data, id: Date.now()};
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return {...response.data, id};
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

export const deleteUser = async id => {
  try {
    await api.delete(`/users/${id}`);
    return id;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};
