import fakeFetch from '@/fake-backend/server';

interface ApiMethod {
  get: (url: string, options?: any) => Promise<any>;
  delete: (url: string, options?: any) => Promise<any>;
  post: (url: string, options?: any) => Promise<any>;
  patch: (url: string, options?: any) => Promise<any>;
  put: (url: string, options?: any) => Promise<any>;
}

// return fetch(url, {
//   method,
//   ...options,
// });
const fetchWrapper = async (method: string, url: string, options?: any) => fakeFetch(method, url, options);

const apiClient: ApiMethod = {
  get: (url: string, options?: any) => fetchWrapper('get', url, options),
  delete: (url: string, options?: any) => fetchWrapper('delete', url, options),
  post: (url: string, options?: any) => fetchWrapper('post', url, options),
  patch: (url: string, options?: any) => fetchWrapper('patch', url, options),
  put: (url: string, options?: any) => fetchWrapper('put', url, options),
};

export default apiClient;
