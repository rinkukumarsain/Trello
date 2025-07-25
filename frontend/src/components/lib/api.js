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

// === Comment APIs ===
 
export const commentCard = (id, data) =>
  axiosInstance.post(`/card/${id}/comments`, data);
export const fetchComments = (id) =>
  axiosInstance.get(`/card/${id}/comments`);

// === Users APIs ===

export const createMember= (id, data) => axiosInstance.post(`/board/${id}/members`,data );
export const getMember = (id) => axiosInstance.get(`/board/${id}/members`);
export const deleteMember = (id, memberId) => axiosInstance.delete(`/board/${id}/members/${memberId}`);

// === Mail APIs ===

export const createMail =(to, subject, message) => axiosInstance.post( `send-mail`,{to, subject, message});
