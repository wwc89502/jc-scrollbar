[![CircleCI](https://dl.circleci.com/status-badge/img/gh/wwc89502/jc-scrollbar/tree/master.svg?style=svg&circle-token=7ab5aa815cb2f135636a1839259bf768b8d7bdbe)](https://dl.circleci.com/status-badge/redirect/gh/wwc89502/jc-scrollbar/tree/master)
[![npm package](https://img.shields.io/npm/v/jc-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/jc-scrollbar)
[![NPM downloads](http://img.shields.io/npm/dm/jc-scrollbar.svg?style=flat-square)](https://www.npmjs.com/package/jc-scrollbar)
[![License](https://img.shields.io/npm/l/jc-scrollbar.svg)](https://www.npmjs.com/package/jc-scrollbar)

# JcScrollbar
> 灵感来源于element-ui的el-scrollbar组件
> 
> 作为Web Components，不依赖任何前端框架，即便是最普通的html页面也可以使用

## 使用方法

#### script标签

```html
<jc-scrollbar wrap-style="height: 100vh;">
  <!-- 内容块 -->
</jc-scrollbar>

<script src="/dist/jc-scrollbar.iife.js"></script>
<script>
  window.CustomElement.register('jc-scrollbar') // register方法设置自定义标签名，默认 scroll-bar
</script>
```

#### vue

```vue
import { register } from '/dist/jc-scrollbar.es.js'
register('jc-scrollbar')

<jc-scrollbar wrap-style="height: 100vh;">
<!-- 内容块 -->
</jc-scrollbar>
```

#### react

```react

```
