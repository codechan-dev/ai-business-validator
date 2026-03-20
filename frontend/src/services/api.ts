import axios from 'axios';
import type { ValidationResult, Signal } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export async function validateIdea(idea: string): Promise<ValidationResult> {
  const response = await api.post<ValidationResult>('/validate', { idea });
  return response.data;
}

export async function fetchSignals(source: string, query: string): Promise<Signal[]> {
  const response = await api.get<Signal[]>('/signals/' + source, {
    params: { query }
  });
  return response.data || [];
}

export async function getHistory(): Promise<any[]> {
  const response = await api.get('/history');
  return response.data;
}

export async function deleteHistoryItem(id: string): Promise<void> {
  await api.delete(`/history/${id}`);
}

export async function exportReport(idea: string, result: any): Promise<Blob> {
  const response = await api.post('/export', { idea, result }, {
    responseType: 'blob'
  });
  return response.data;
}

export default api;
