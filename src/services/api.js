// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://horoscopo-back-mocha.vercel.app',
});

// Interceptor: adjunta el token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funciones de servicio (export nombrado)
export const obtenerTodosLosSignos = async () => {
  const { data } = await api.get('/signos');
  return data;
};

export const obtenerSignoPorNombre = async (nombre) => {
  const { data } = await api.get(`/signos/${nombre}`);
  return data;
};
export const loginUsuario = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};