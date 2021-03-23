import { http } from '../http';

const address = {
  addressList(params) {
    console.log(params)
    http('/spAddress/getAddressList', 'post', params)
  }
}


export default {
  address
}