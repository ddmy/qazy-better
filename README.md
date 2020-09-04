# Qazy-Better
> 参考Qazy(https://github.com/narayanprusty/Qazy)
## 介绍
> 为了支持服务端渲染真实的图片地址，同时在客户端又支持图片懒加载。
### 使用方法
```
  import Qazy from './src/qazy'
  const qazy = new Qazy(options)  
```

#### options
配置项|类型|默认值|备注
---|:---:|---:|---:
loading|String|data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==|加载中的图片
select|String&#124;HTMLHeadingElement|body|处理指定元素内的图片
listener|Array|['scroll','wheel','mousewheel','resize','animationend','transitionend','transitioncancel','fullscreenchange']|监听的事件
filter|Function|null|真实图片地址替换前的过滤函数