import http from "../http-common";

class TeamSugiDataService {
    getAll() {
        return http.get("/TeamSugi");
    }

    get(id) {
        return http.get(`/TeamSugi/${id}`);
    }

    update(data) {
        return http.put(`/TeamSugi/Update`, data);
    }

    delete(id){
        return http.delete(`/TeamSugi/${id}`);
    }

    create(data) {
        return http.post("/TeamSugi/Create", data);
    }
    
}
export default new TeamSugiDataService();