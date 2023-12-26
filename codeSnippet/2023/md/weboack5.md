## css-loader
```js
// webpack.config.js
module.exports = {
  module: {
    // rules是数组，因为可能会处理很多其他资源模块，需要其他loader
    // test 匹配哪些文件需要转换
    // use 需要使用什么loader，如果要处理匹配到的这个资源需要多个loader，就写成数组形式
    rules: [{ test: /\.css$/, use: "css-loader" }],
    // 只用一个loader，还可以写成
    rules: [{ test: /\.css$/, loader: "css-loader" }],
  },
};

```

style-loader 将CSS文件插入到html中
```js
// webpack.config.js

module.exports = {
  module: {
    // 从右到左，先用css-loader解析，再用style-loader插入style标签到html中
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"]],
    // use里面直接写字符串是简写，如果要颗粒度更细的配置，就写成对象，如
      rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // css-loader的配置项
            },
          },
        ],
      },
    ],
  },
};
```

## SCSS文件
```js
module.exports = {
  module: {
    rules: [
     
      {
        test: /\.s[ac]ss$/,
         // 从右到左，现将sass编译成css,再处理css，再加入style
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};

```

## CSS 新特性
 PostCSS是一个用 JavaScript 工具和插件转换 CSS 代码的工具，利用从 Can I Use 网站获取的数据为 CSS 规则添加特定厂商的前缀。 Autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // 先加前缀，再解析css文件，再插入style
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                //postcss插件
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      }
    ],
   
  },
};

```
也可以将postcss的配置提取到一个单独的文件 postcss.config.js 中，在根目录下建一个postcss.config.js，webpack调用postcss-loader的时候会读取到postcss.config.js里面的配置

```js
// postcss.config.js
module.exports = {
  // postcss插件
  plugins: ["autoprefixer"],
};

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }
    ],
  },
};

```
也可以使用 postcss-preset-env，它包含 autoprefixer，不仅可以添加前缀，还能处理其他的css新特性
```js
// postcss.config.js

module.exports = {
  // postcss插件
  plugins: ["postcss-preset-env"]
};

```

## 处理图片资源
webpack5 可以使用内置的 资源模块 轻松处理图像、字体资源
资源模块类型有4 种：

+ asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
+ asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
+ asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
+ asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。

资源类型设置为 type: "asset/resource"，打包成单独文件，并把路径注入到包文件dist/main.js中
```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        // type 属性设置资源模块类型
        // "asset/resource"无论图像大小，都会打包成单独的文件
        type: "asset/resource",
        generator: {
          // 生成的图片在assets目录下
          // 名字为原来的名字name截取10位hash值，保留原来的扩展名
          filename: "assets/[name]_[contenthash:10][ext]",
        },
      },
    ],
  },
};

```

资源类型设置为 type: "asset/inline"，把所有图片文件都作为 data URI 注入到dist/main.js中。

```js 
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        // "asset/inline" 无论图像大小，图像文件默认编码为base64注入js文件中
        type: "asset/inline",       
      },
    ],
  },
};

```

资源类型设置为 type: "asset"，默认小于 8kb 的文件，将会视为 inline 模块类型默认编码成base64注入包文件，否则会被视为 resource 模块类型单独打成文件。可以设置 Rule.parser.dataUrlCondition.maxSize选项来修改此条件：

```js 
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset",
        parser: {
        // 如果一个模块源码大小小于 `maxSize`，那么模块会被作为一个 Base64 编码的字符串注入到包中， 
        // 否则模块文件会被生成到输出的目标目录中。
        // 大图片打包成base64注入js文件，使js文件变大，影响下载速度，所以最好单独打包下载
        // 小图片单独打包下载，浏览器请求频繁，也影响性能，可以直接打成base64
          dataUrlCondition: {
            maxSize: 20 * 1024,
          },
        },
        generator: {
          filename: "assets/[name]_[contenthash:10][ext]",
        },
      },
    ],
  },
};

```

自定义输出文件名方式， generator.filename 与 output.assetModuleFilename 相同，但仅适用于 type：asset 和 type：asset/resource 模块类型.


## 
