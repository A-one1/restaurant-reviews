import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`restaurants?page=${page}`);
  }

  get(id) {
    //return http.get(`/restaurants/id/${id}`);//path parameter
    return http.get(`/restaurant?id=${id}`);//query parameter for realm
  }

  find(query, by = "name", page = 0) {
    return http.get(`restaurants?${by}=${query}&page=${page}`);
  } 

  createReview(data) {
    //return http.post(`/restaurants/review`, data); node

    return http.post(`/review_new`, data); //realm
  }

  updateReview(data) {
    return http.put("/review_edit", data);
  }

  deleteReview(id, userId) {
   // return http.delete(`/restaurants/review?id=${id}`, {data:{user_id: userId}}); //node

    return http.delete(`/review_delete?id=${id}`, {data:{user_id: userId}});//realm
  }

  getCuisines(id) {
    return http.get(`/cuisines`);
  }

}

export default new RestaurantDataService();