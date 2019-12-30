import Api from '@/service/Api'
// import { ResponseService } from '@/service/ResponseService'

export default class LoginService extends Api {
  constructor () {
    super('/login')
  }
}