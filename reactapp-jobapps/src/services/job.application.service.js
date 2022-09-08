import http from "../axios/job-application-http-common";
import authHeader from "./auth.header";

class JobApplicationService {
  addJobApplication = async (data) => {
    return await http.post(`/addJobApplication`, data);
  };
}
export default new JobApplicationService();
