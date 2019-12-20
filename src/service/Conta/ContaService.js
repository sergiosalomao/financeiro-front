import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class ContaService extends Api {
  constructor () {
    super('/contas')
  }
}