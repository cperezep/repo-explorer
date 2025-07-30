import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosHeaders } from 'axios';
import type { AxiosResponse } from 'axios';

import request from './request';

vi.mock('axios');

describe('request', () => {
  const mockAxios = vi.mocked(axios, true);

  const mockUrl = '/test-endpoint';
  const mockResponse: AxiosResponse = {
    data: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: { headers: new AxiosHeaders() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets the base URL from environment variable', () => {
    expect(axios.defaults.baseURL).toBe(import.meta.env.VITE_BASE_URL);
  });

  it('makes a GET request', async () => {
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = await request('GET', mockUrl);

    expect(mockAxios.request).toHaveBeenCalledWith({ method: 'GET', url: mockUrl });
    expect(result).toBe(mockResponse);
  });

  it('makes a POST request with data', async () => {
    const postData = { name: 'test', value: 123 };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = await request('POST', mockUrl, postData);

    expect(mockAxios.request).toHaveBeenCalledWith({ method: 'POST', url: mockUrl, data: postData });
    expect(result).toBe(mockResponse);
  });

  it('makes a PUT request with data', async () => {
    const putUrl = `${mockUrl}/1`;
    const putData = { id: 1, name: 'updated' };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = await request('PUT', putUrl, putData);

    expect(mockAxios.request).toHaveBeenCalledWith({ method: 'PUT', url: putUrl, data: putData });
    expect(result).toBe(mockResponse);
  });

  it('makes a DELETE request', async () => {
    const deleteUrl = `${mockUrl}/1`;
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = await request('DELETE', deleteUrl);

    expect(mockAxios.request).toHaveBeenCalledWith({ method: 'DELETE', url: deleteUrl });
    expect(result).toBe(mockResponse);
  });

  it('handles request errors', async () => {
    const error = new Error('Network error');
    mockAxios.request.mockRejectedValueOnce(error);

    await expect(request('GET', mockUrl)).rejects.toThrow('Network error');
  });
});
