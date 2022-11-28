import axios from 'axios';

export default class ApplicantService {
    url = 'http://localhost:8080/api/v1/applicants';

    async getAll() {
        return await axios.get(this.url);
    }

    async add(applicant) {
        return await axios({
                               method: 'POST',
                               url: this.url,
                               data: applicant,
                               headers: { 'Content-Type': 'application/json;charset-UTF-8' }
                           })
            .then((res) => {
                return res.data;
            }).catch((err) => {
                return err.response;
            });
    }

    delete(id) {
        return axios.delete(this.url + '/' + id).then(res => {
            return res.data.message;
        }).catch(err => {
            return err.response;
        })
    }

    removeAnApplicant(id) {
        return axios.delete(this.url + '/remove-an-applicant/' + id).then(res => {
            return res.data.message;
        }).catch(err => {
            return err.response;
        })
    }
}
