import { axiosInstance } from './axios';


// Board APi
export const fetchBoards = () => axiosInstance.get('/board');
export const fetchBoardById = (id) => axiosInstance.get(`/board/${id}`);
export const createBoard = (data) => axiosInstance.post('/board', data);
export const deleteBoard = (id) => axiosInstance.delete(`/board/${id}`);
export const updateBoard = (id, data) => axiosInstance.put(`/board/${id}`, data);



// === List APIs ===
export const createList = (data) => axiosInstance.post('/list', data);
export const fetchAllLists = () => axiosInstance.get('/list');
export const fetchListsByBoard = (boardId) => axiosInstance.get(`/list/${boardId}`);
export const updateList = (id, data) => axiosInstance.put(`/list/${id}`, data);
export const deleteList = (id) => axiosInstance.delete(`/list/${id}`);

// === Card APIs ===
export const createCard = (data) => axiosInstance.post('/card', data);
export const fetchCardsByList = (listId) => axiosInstance.get(`/card/${listId}`);
export const updateCard = (id, data) => axiosInstance.put(`/card/${id}`, data);
export const deleteCard = (id) => axiosInstance.delete(`/card/${id}`);
export const commentCard = (id, text) =>
  axiosInstance.post(`/card/${id}/comments`, { text });
