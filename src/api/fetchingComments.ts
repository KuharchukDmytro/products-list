/* eslint-disable import/no-anonymous-default-export */
import { Comment } from "../types/Comment";

function request<T>(url: string, method: string, body?: any): Promise<T> {
  const fullUrl = 'http://localhost:3000' + url;

  return fetch(fullUrl, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export default {
  getAll: () => request<Comment[]>('/comments', 'GET'),
  getById: (commentId: number) => request<Comment>(`/comments/${commentId}`, 'GET'),
  create: (comment: Comment) => request<Comment>('/comments', 'POST', comment),
  remove: (commentId: number) => request<Comment>(`/comments/${commentId}`, 'DELETE'),
};
