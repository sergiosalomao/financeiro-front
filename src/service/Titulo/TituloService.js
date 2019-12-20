import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class TituloService extends Api {
  constructor () {
    super('/titulos')
  }
}