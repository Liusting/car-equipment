import { request } from '../http';

const category = {
  //分类树
  categoryTree(params) {
    return request('/spCategory/getCategoryTree', 'get', params)
  }
}


export default {
  category
}