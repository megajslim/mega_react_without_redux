import http from "../http-common";

class TeamSugiDataService {
    getAll() {
        return http.get("/TeamSugi");
    }

    get(id) {
        return http.get(`/TeamSugi/${id}`);
    }
}
export default new TeamSugiDataService();