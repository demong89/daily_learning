// axios
// 1.defaults 初始配置
// 2.interceptor 拦截器
// 3.request 请求方法

// axios实例的三个主要核心属性：
// 1、config 包括URL、method、headers、params、data等请求信息

// 2、interceptors 拦截器，可以对请求和响应做一些处理，比如设置请求头、请求参数、响应数据等
// 3、request 调用xhr或http请求方法，参数是config。可以发送请求，并返回Promise对象，可以用then方法获取响应数据

// axios请求流程
// 1、config = mergeConfig(defaults, config) 合并axios的默认配置项和本次传入的配置项
// 2、config.headers = AxiosHeaders.concat(contextHeaders,headers) 合并axios默认配置的headers和本次传入的headers
// 3、获取axios.interceptors.request的拦截器，拼接成数组
// 4、获取axios.interceptors.response的拦截器，拼接成数组
// 5、执行request拦截器
// 6、执行请求
// 6.1 请求前判断是否取消请求，如果有则抛出异常
// 6.2 执行config.transformRequest，请求数据转换器
// 6.3 发送请求，内部还会判断是否取消请求
// 6.4 请求后判断是否取消请求，如果有则抛出异常
// 6.5 执行config.transformResponse，响应数据转换器

// 7、执行response拦截器
// 8、返回Promise对象，可以用then方法获取响应数据

// const http = require("https");

// // http.get('https://www.zhipin.com/wapi/zpCommon/data/cityGroup.json').then(res=>console.console.log(res))

// http
//   .get("https://www.zhipin.com/wapi/zpCommon/data/cityGroup.json", (res) => {
//     let data = "";

//     res.on("data", (chunk) => {
//       data += chunk;
//     });

//     res.on("end", () => {
//       const { zpData } = JSON.parse(data);

//       const { locationCity, hotCityList, cityGroup } = zpData;
//       console.log(locationCity);
//       const { code, name } = locationCity; // 当前的

//       const hotCity = hotCityList.map((item) => {
//         return {
//           code: item.code,
//           name: item.name,
//         };
//       });
//       let cityList = [];
//       cityGroup.forEach((item) => {
//         cityList = cityList.concat(item.cityList);
//       });
//       const cityListMap = cityList.map((item) => {
//         return {
//           code: item.code,
//           name: item.name,
//         };
//       });
//       // console.log(cityListMap);
//     });
//   })
//   .on("error", (err) => {
//     console.error(`Problem with request: ${err.message}`);
//   });

// http.get('https://www.zhipin.com/wapi/zpgeek/search/joblist.json?scene=1&query=前端&city=101030100&experience=&payType=&partTime=&degree=&industry=&scale=&stage=&position=&jobType=&salary=&multiBusinessDistrict=&multiSubway=&page=1&pageSize=30', (res) => {
//   let data = '';

//   res.on('data', (chunk) => {
//     data += chunk;
//   });

//   res.on('end', () => {
  
//     const res1 = JSON.parse(data);
//     // const { data: jobList } = res;
//     console.log(res1);
//   });
// }).on('error', (err) => {
//   console.error(`Problem with request: ${err.message}`);
// });
