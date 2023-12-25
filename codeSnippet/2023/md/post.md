## 同源
协议、主机、端口相同


同源策略主要表现在以下三个方面：DOM、Web 数据和网络。

+ DOM 访问限制：同源策略限制了网页脚本（如 JavaScript）访问其他源的 DOM。通过脚本无法直接访问跨源页面的 DOM 元素、属性或方法。这是为了防止恶意网站从其他网站窃取敏感信息。
+ Web 数据限制：同源策略也限制了从其他源加载的 Web 数据（例如 XMLHttpRequest 或 Fetch API）。在同源策略下，XMLHttpRequest 或 Fetch 请求只能发送到与当前网页具有相同源的目标。这有助于防止跨站点请求伪造（CSRF）等攻击。
+ 网络通信限制：同源策略还限制了跨源的网络通信。浏览器会阻止从一个源发出的请求获取来自其他源的响应。这样做是为了确保只有受信任的源能够与服务器进行通信，以避免恶意行为。
出于安全原因，浏览器限制从脚本内发起的跨源 HTTP 请求，XMLHttpRequest 和 Fetch API，只能从加载应用程序的同一个域请求 HTTP 资源，除非使用 CORS 头文件

## CORS
浏览器将不同域的内容隔离在不同的进程中，网络进程负责下载资源并将其送到渲染进程中，但由于跨域限制，某些资源可能被阻止加载到渲染进程。如果浏览器发现一个跨域响应包含了敏感数据，它可能会阻止脚本访问这些数据，即使网络进程已经获得了这些数据。

跨源资源共享（Cross-Origin Resource Sharing，CORS）是一种机制，允许在受控的条件下，不同源的网页能够请求和共享资源。由于浏览器的同源策略限制了跨域请求，CORS 提供了一种方式来解决在 Web 应用中进行跨域数据交换的问题。

CORS 的基本思想是，服务器在响应中提供一个标头（HTTP 头），指示哪些源被允许访问资源。浏览器在发起跨域请求时会先发送一个预检请求（OPTIONS 请求）到服务器，服务器通过设置适当的 CORS 标头来指定是否允许跨域请求，并指定允许的请求源、方法、标头等信息。

## 简单请求
不会触发 CORS 预检请求。这样的请求为 简单请求。
若请求满足所有下述条件，则该请求可视为 简单请求：

+ HTTP 方法限制：只能使用 GET、HEAD、POST 这三种 HTTP 方法之一。如果请求使用了其他 HTTP 方法，就不再被视为简单请求。
+ 自定义标头限制：请求的 HTTP 标头只能是以下几种常见的标头：Accept、Accept-Language、Content-Language、Last-Event-ID、Content-Type（仅限于 application/x-www-form-urlencoded、multipart/form-data、text/plain）。HTML 头部 header field 字段：DPR、Download、Save-Data、Viewport-Width、WIdth。如果请求使用了其他标头，同样不再被视为简单请求。
+ 请求中没有使用 ReadableStream 对象。
+ 不使用自定义请求标头：请求不能包含用户自定义的标头。
+ 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器；XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问

## 预检请求
非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为 预检请求。

需预检的请求要求必须首先使用 OPTIONS 方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。预检请求 的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

预检请求的头信息包括两个特殊字段：

+ Access-Control-Request-Method：该字段是必须的，用来列出浏览器的 CORS 请求会用到哪些 HTTP 方法
+ Access-Control-Request-Headers：该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段
+ access-control-allow-origin： 设置为* 符号，表示统一任意跨源请求。
+ access-control-max-age：可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
一旦服务器通过了 预检请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个 Access-Control-Allow-Origin 头信息字段。

