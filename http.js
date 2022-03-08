let http = {
  //使用promise封装ajax
  promiseAjax(options) {
    //options.type: 请求方式, string
    //options.url: 请求路径, string, 必填
    //options.params: 请求参数, object

    return new Promise((resolve, reject) => {

      console.log('options.type ==> ', options.type);

      //默认值
      options.type = options.type || 'get';

      console.log('options.type ==> ', options.type);

      //1、创建ajax对象
      let xhr = new XMLHttpRequest();

      //2、监听ajax对象状态的变化
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.response);
        }
      }

      let paramsString = '';

      if (options.params) {
        for (let key in options.params) {
          paramsString += `${key}=${options.params[key]}&`;
        }
        paramsString = paramsString.slice(0, -1);
      }

      if (options.type.toLowerCase() === 'get') {
        options.url += `&${paramsString}`;
      }

      //3、建立服务器链接
      xhr.open(options.type, options.url, true);

      //在发送http请求之前设置响应内容类型
      xhr.responseType = 'json';

      //4、发起http请求
      xhr.send();

    })
  }
};