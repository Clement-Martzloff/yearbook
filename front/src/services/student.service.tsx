import http from "../http-common";

export const StudentService = {
  get(id: string) {
    return http.get(`/students/${id}`);
  },
  create(data: { [key: string]: any }) {
    return http.post("/students", data);
  },
  update(id: string, data: { [key: string]: any }) {
    return http.put(`/students/${id}`, data);
  },
  erase(id: string) {
    return http.delete(`/students/${id}`);
  },
  fullTextSearch(term: string) {
    return http.get(`/students?q=${term}`);
  },
};
