
import { axiosInstance } from './axios';

export const fetchBoards = () => axiosInstance.get('/board/view');
export const createBoard = (data) => axiosInstance.post('/board', data);
export const deleteBoard = (id) => axiosInstance.delete(`/board/${id}`);
export const updateBoard = (id, data) => axiosInstance.put(`/board/${id}`, data);
