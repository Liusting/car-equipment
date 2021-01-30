const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function Format(format, _date) {
  var o = {
    "M+": _date.getMonth() + 1, //month
    "d+": _date.getDate(), //day
    "h+": _date.getHours(), //hour
    "m+": _date.getMinutes(), //minute
    "s+": _date.getSeconds(), //second
    "q+": Math.floor((_date.getMonth() + 3) / 3), //quarter
    "S": _date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

function DateAdd(interval, number) {
  number = parseInt(number);
  var now = new Date();
  var date = new Date(now.getTime());
  switch (interval) {
    case "y":
      date.setFullYear(now.getFullYear() + number);
      break;
    case "m":
      date.setMonth(now.getMonth() + number);
      break;
    case "d":
      date.setDate(now.getDate() + number);
      break;
    case "w":
      date.setDate(now.getDate() + 7 * number);
      break;
    case "h":
      date.setHours(now.getHours() + number);
      break;
    case "n":
      date.setMinutes(now.getMinutes() + number);
      break;
    case "s":
      date.setSeconds(now.getSeconds() + number);
      break;
    case "l":
      date.setMilliseconds(now.getMilliseconds() + number);
      break;
  }
  return date;
}

function test(value) {
  return value;
}

/**
 * 校验
 * @param {字符串类型} str 
 * @param {什么类型 type 
 */
function checkStr(str, type) {
  switch (type) {
    case 'phone': //手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    case 'date': //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': //数字
      return /^[0-9]$/.test(str);
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str);
    case 'chinese': //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str);
    case 'lower': //小写
      return /^[a-z]+$/.test(str);
    case 'upper': //大写
      return /^[A-Z]+$/.test(str);
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
}

module.exports = {
  formatTime: formatTime,
  test: test,
  Format: Format,
  DateAdd: DateAdd,
  checkStr
}