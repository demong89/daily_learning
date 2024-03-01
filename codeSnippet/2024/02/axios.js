// axios
// 1.defaults 初始配置
// 2.interceptor 拦截器
// 3.request 请求方法

// axios执行

//

const http = require("https");

// http.get('https://www.zhipin.com/wapi/zpCommon/data/cityGroup.json').then(res=>console.console.log(res))

http
  .get("https://www.zhipin.com/wapi/zpCommon/data/cityGroup.json", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const { zpData } = JSON.parse(data);

      const { locationCity, hotCityList, cityGroup } = zpData;
      console.log(locationCity);
      const { code, name } = locationCity; // 当前的

      const hotCity = hotCityList.map((item) => {
        return {
          code: item.code,
          name: item.name,
        };
      });
      let cityList = [];
      cityGroup.forEach((item) => {
        cityList = cityList.concat(item.cityList);
      });
      const cityListMap = cityList.map((item) => {
        return {
          code: item.code,
          name: item.name,
        };
      });
      // console.log(cityListMap);
    });
  })
  .on("error", (err) => {
    console.error(`Problem with request: ${err.message}`);
  });

http.get('https://www.zhipin.com/wapi/zpgeek/search/joblist.json?scene=1&query=前端&city=101030100&experience=&payType=&partTime=&degree=&industry=&scale=&stage=&position=&jobType=&salary=&multiBusinessDistrict=&multiSubway=&page=1&pageSize=30', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
  
    const res1 = JSON.parse(data);
    // const { data: jobList } = res;
    console.log(res1);
  });
}).on('error', (err) => {
  console.error(`Problem with request: ${err.message}`);
});
