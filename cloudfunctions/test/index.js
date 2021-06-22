// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
 
  const msg = "这是一条测试信息"

  return {
    msg:msg
  }
}