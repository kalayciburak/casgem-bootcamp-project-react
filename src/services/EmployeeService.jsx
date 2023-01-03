import axios from 'axios';

export default class EmployeeService {

    async getAll() {
        return await axios.get(`http://localhost:8080/api/v1/employees`);
    }

    async getById(id) {
        return await axios.get(`http://localhost:8080/api/v1/employees/${id}`).catch(err => {
            console.log(err);
        });
    }
}
