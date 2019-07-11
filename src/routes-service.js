import axios from 'axios';

class RoutesService {
  constructor() {
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    })
  }

  getName()  {
    return this.user.get('/user')
    .then(({ data }) => data);
  }

  create(name) {
    console.log('routes-service', name)
    return this.user.post('/user/create', { name } )
    .then(({ data }) => data)
  }
}
const routesService = new RoutesService();

export default routesService;