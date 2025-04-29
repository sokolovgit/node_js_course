import request from 'superagent'

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

const withJsonAccept = (req: request.SuperAgentRequest) => req.accept('json')

const apiClient = {
  get: (url: string) => withJsonAccept(request.get(`${API_BASE_URL}${url}`)),
  post: (url: string) => withJsonAccept(request.post(`${API_BASE_URL}${url}`)),
  put: (url: string) => withJsonAccept(request.put(`${API_BASE_URL}${url}`)),
  delete: (url: string) => withJsonAccept(request.delete(`${API_BASE_URL}${url}`)),
  patch: (url: string) => withJsonAccept(request.patch(`${API_BASE_URL}${url}`)),
}

export default apiClient
