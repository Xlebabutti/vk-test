import axios from 'axios';

class FactService {
    private URL = 'https://catfact.ninja';

    async getFacts() {
        return axios.get(`${this.URL}/fact`);
    }
}

export default new FactService();

//add dto
