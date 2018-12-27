import axios from 'axios';

class api {

  //construtor function
  constructor({url}){
    this.url = url
    this.endpoints = {}
  }

  createEntity(entity) {
    this.endpoints[entity.name] = this.createBasicCrudEndpoints(entity)
  }

  createEntities(arrayOfEntities){
    arrayOfEntities.forEach(this.createEntity.bind(this))
  }

  createBasicCrudEndpoints ({name}) {
    var endpoints = {}
    const resourceURL = `${this.url}/${name}`   
   
    endpoints.getAll = ({params}={}) => axios.get(resourceURL,{ params})
    
    endpoints.getOne = (id) => axios.get(`${resourceURL}/${id}`)
    
    endpoints.create = (toCreate) => axios.post(resourceURL,toCreate)

    endpoints.update = (toUpdate) => axios.put(resourceURL, toUpdate)

    endpoints.delete = (id) => axios.delete(`${resourceURL}/${id}`)

    return endpoints
  }
  callApi (url,data){
    return axios.post(url,data);
  }
}

export default api;