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


## babel转译js

```bash
npm install -D babel-loader @babel/core @babel/preset-env

npm install core-js@3

```

+ core-js：它是JavaScript标准库的 polyfill（垫片/补丁）包集合。
+ babel-loader：在Webpack里使用babel转译js文件，
+ @babel/core：是babel的大脑，负责调度babel的各个功能模块，
 + @babel/preset-env：babel预设，一组babel插件的集合，就不需要一个个去设置babel的插件，但是preset-env只能进行语法转换，不能弥补浏览器缺失的一些新功能，比如一些内置对象和方法，所以需要corejs来弥补老版浏览器缺失的新功能， 参数选项：

+ targets：不配置，会查询package.json中的browserslist，或者项目根目录下的.browserslistrc，都不设，@babel/preset-env默认会使用 browserslist config sources，实际上是
"targets": "> 0.25%, not dead"；
+ useBuiltIns：'usage'，只对使用到的功能打补丁，core-js自动被引入按需打包；'entry'，在index.ts入口import 'core-js'，把所有的polyfill打包；
+ corejs：此选项仅在与 useBuiltIns: usage 或 useBuiltIns: entry 一起使用时有效，一般使用版本 3，会 polyfill 实例方法，而 corejs2 不会

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
     {
        test: /\.m?js$/,
        // 排除node_modules，不用转译
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器
                  targets: {
                    chrome: "58",
                    ie: "11",
                  },
                  // 自动引入core-js根据目标浏览器按需使用打补丁
                  useBuiltIns: "usage",
                  //  一般是指定 3，这个会 polyfill 实例方法，而 corejs2 不会
                  corejs: 3,
                },
              ]           
            ],
          },
        },
      },
    ],
  },
};

```
@babel/preset-env 转换用到的一些辅助代码是直接注入到模块里的，没有做抽离，多个模块可能会重复注入，并且用到的 polyfill 代码 core-js以及它提供的 Promise、Set 和 Map 等内置函数也是全局导入 ，会污染全局作用域，如果代码是一个打算发布以供其他人使用的库，那么它就会成为一个问题。

解决这个问题就要使用 @babel/plugin-transform-runtime 插件，可以重用 Babel 的注入帮助代码以节省代码大小，依赖模块 @babel/runtime 以避免编译输出中的重复。同时也通过设置选项corejs进行polyfill，依赖@babel/runtime-corejs3,corejs: 2 仅支持全局变量（例如 Promise）和静态属性（例如 Array.from），而 corejs: 3 还支持实例属性（例如 [].includes)

```bash
pnpm add -D @babel/plugin-transform-runtime
pnpm add @babel/runtime
pnpm add @babel/runtime-corejs3

```
启用@babel/plugin-transform-runtime插件后，@babel/preset-env 中的 useBuiltIns 选项不得设置。 否则，此插件可能无法完全沙盒化环境。


```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
     {
        test: /\.m?js$/,
        // 排除node_modules，不用转译
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 设置兼容目标浏览器
                  targets: {
                    chrome: "58",
                    ie: "11",
                  },
                  // 自动引入core-js根据目标浏览器按需使用打补丁
                  //  useBuiltIns: "usage",
                  //  一般是指定 3，这个会 polyfill 实例方法，而 corejs2 不会
                  //  corejs: 3,
                },
              ]           
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                 // 从@babel/runtime-corejs3 引入polyfill
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};

```
注意： babel插件在预设前运行，@babel/plugin-transform-runtime 在 @babel/preset-env 之前调用的，将不兼容的语法和api转换了，但是他没有target配置，不能按需polyfill，所以最后打包文件会变大。
和postcss一样也可以将babel的配置提取到一个单独的文件 babel.config.js 中，在根目录下建一个babel.config.js，webpack调用babel-loader的时候，babel会读取到babel.config.js里面的配置

babel的配置文件在根目录下还可以写成其他形式：

+ babel.config.json
+ .babelrc
+ .babelrc.js
+ .babelrc.json
+ 直接在package.json中写配置

## 