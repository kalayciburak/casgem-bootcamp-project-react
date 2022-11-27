import axios from "axios";

export default class BootcampService {

    async getAll() {
        return await axios.get(`http://localhost:8080/api/v1/bootcamps`)
    }
}
