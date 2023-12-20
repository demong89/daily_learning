@starting-style 可以定义元素的初始样式，使得元素在初次渲染时也能有过渡效果。

```css
 div{
   transform: scale(1);
   transition: 1s;
 }
 @starting-style {
   div{
     transform: scale(0);
   }
 }
```

使 display:none 有过渡效果。
```css
 div{
   display: none;
   transition: 1s;
   transform: scale(0)
 }
 div.show{
   display: block;
   transform: scale(1)
 }
 ```


 一个可以改变元素初始状态的新特性:

+ transition 需要有状态的改变才能触发过渡效果

+ animation 无需状态改变，因为可以自动运行

+ @starting-style 可以改变元素的初始状态，让元素在初次渲染时也有过渡效果

+ @starting-style 可以在元素添加时直接添加过渡效果

+ @starting-style 可以让 display:none 也支持过渡


注意：兼容性