## 安装TS依赖
npm install --save-dev typescript ts-node  
+ 集成 Babel  


npm install -D @babel/preset-typescript
```js
// babel.config.js
{
"presets": [
// ...
"@babel/preset-typescript"
]
}
```

+ 集成ESlint


npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin  

注意： @typescript-eslint/parser 和 @typescript-eslint/eslint-plugin 必须使用相同的版本

```js
 // .eslintrc.js
 "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
// 可以直接启用推荐的规则
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
]
// 也可以选择自定义规则
"rules": {
"@typescript-eslint/no-use-before-define": "error",
// ...
}
```

## 配置TS
tsc --init   


https://www.typescriptlang.org/zh/play

![原文](https://mp.weixin.qq.com/s/w3ZuwnGxs0tkeMz6ccL4Uw)