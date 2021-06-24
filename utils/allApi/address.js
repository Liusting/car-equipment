import { request } from '../http';

const address = {
  addressList(params) {
    return request('/spAddress/spAddressList', 'get', params)
  }
}


export default {
  address
}