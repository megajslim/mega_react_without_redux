import http from "../http-common";

class TeamSugiDataService {
    getAll() {
        return http.get("/TeamSugi");
    }
}
export default new TeamSugiDataService();