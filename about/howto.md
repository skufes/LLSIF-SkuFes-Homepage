# 使用本站的一些指引

## 档线查看

### 速度的计算

### 图功能

档线站先进的的交互式图表功能由 [plotly.js](https://plot.ly/javascript/) 方案构建。该方案允许我们快速绘制大量数据，并允许用户调整可见范围、选择可见的系列等。

## 卡面查看

本卡面浏览器可以在首页直接查看卡面，并在列表页选择查看觉醒与未觉醒、卡框模式选择正常带卡框、无框、或透明背景模式。

本系统的卡面查看系统的筛选功能尚不完善，目前仅支持按稀有度和颜色筛选。

## 游戏内公告

本站是通过构建登录用户[反向代理](https://zh.wikipedia.org/wiki/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86)的方式，允许用户通过普通浏览器访问游戏内公告。访问是实时的，没有缓存。这就意味着当官方服务器处于维护状态时，本站的该功能也将无法使用。

本站通过屏蔽了官方滚动条相关的 JavaScript 和 CSS 代码、修改了长宽限制基本解决了在手机和电脑上的滚动和滑动的问题。本站的新闻查看器还通过 CSS 修改调整了标题与图片的样式，并关闭了禁止选择的设置、允许用户复制文字部分内容。

## 编程接口

以下选项中 `id` 均为可选，不填写则获取数据集列表，填写 `id` 后所得数据获得该项的详细数据。

### JSON 数据接口

1. 部员数据：[`https://api.skufes.moe/db/unit/[:id]`](https://api.skufes.moe/db/unit/)
2. 卡面对数据：[`https://api.skufes.moe/db/pair/[:id]`](https://api.skufes.moe/db/pair/)
3. 活动对数据：[`https://api.skufes.moe/db/event/[:id]`](https://api.skufes.moe/db/event/)
4. 数据库解密密钥：[`https://api.skufes.moe/release_key/[:id]`](https://api.skufes.moe/release_key/)

### 卡面数据接口

### 原始文件数据接口