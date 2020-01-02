import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class LancamentoService extends Api {
  constructor () {
    super('/lancamentos')
  }
}