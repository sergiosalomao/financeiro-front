import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class BancoService extends Api {
  constructor () {
    super('/bancos')
  }
}