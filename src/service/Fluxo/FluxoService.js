import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class FluxoService extends Api {
  constructor () {
    super('/fluxos')
  }
}