import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class CedenteService extends Api {
  constructor () {
    super('/cedentes')
  }
}
