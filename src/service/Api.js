import { http } from './Http'
import { ResponseService } from './ResponseService'
import queryString from 'querystring'

export default class API {
  constructor(api) {
    this.api = api
    this.http = http
    this.queryString = queryString
  }
  list = async () => {
    try {
      const response = await http.get(this.api)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'list')
    }
  }
  show = async ($id) => {
    try {
      const response = await http.get(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'get', 'item')
    }
  }

  create = async ($data) => {
    try {
      const response = await http.post(this.api, $data)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'create')
    }
  }

  update = async ($data) => {
    try {
      const response = await http.put(`${this.api}/${$data.id}`, $data)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'update')
    }
  }

  remove = async ($id) => {
    try {
      const response = await http.delete(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'remove')
    }
  }

  search = async (params = {}) => {
    
    const queryString = require('query-string');
    const queryString2 = this.queryString.stringify(params);
    try {
      const response = await http.get(`${this.api}/?${queryString2}`)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'get', 'item')
    }
  }

  createOrUpdate = async ($data) => {
    const method = $data.id ? `put` : `post`
    const id = $data.id ? `/${$data.id}` : ''
    const url = `${this.api}${id}`
    try {
      const response = await http[method](url, $data)
      return response.data
    } catch (error) {
      throw ResponseService(error, 'create')
    }
  }
}