# Vue 3 + Vite + NeteasyApi
仿[YesPlayMusic](https://github.com/qier222/YesPlayMusic)的学习vue3项目，侵删！！！
## 功能
很简陋，很多问题没改，暂时只是搭个架子，只有歌单，通过歌单播放音乐。
可直接修改url到/login页面登录。
## 项目
API 源代码来自 [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
页面仿[YesPlayMusic](https://github.com/qier222/YesPlayMusic)

[勉强能看](https://vue3-yesplay.vercel.app/#/)
## 部署至 Vercel
### 部署API
1. fork [Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)项目
2. 在 [Vercel](https://vercel.com/) 官网点击 New Project
3. 点击 Import Git Repository 并选择你 fork 的 NeteaseCloudMusicApi 项目并点击import
5. 点击 PERSONAL ACCOUNT 的 select
6. 直接点Continue
7. PROJECT NAME自己填,FRAMEWORK PRESET 选 Other 然后直接点 Deploy 接着等部署完成即可
   
### 部署前端
和api一样导入前端项目
1. 项目根目录需要有vercel.json

<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/vercel.png"/>

```javascript
{
  "rewrites": [
    {
      "source": "/api/:match*",
      "destination": "https://图片红框地址/:match*"
    }
  ]
}
```
2. 新加一个Environment Variables，填写 Name 为 VUE_APP_NETEASE_API_URL，Value 为 /api
3. 
```
//vite项目新增.env文件
VITE_APP_NETEASE_API_URL = '/api'

//axios修改baseUrl
process.env.NODE_ENV === 'production'?import.meta.env.VITE_APP_NETEASE_API_URL:'http://localhost:3000/'
```
## 预览

<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/preview1.png"/>
<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/preview2.png"/>
<img src="https://gitee.com/Younglina/younglinaBlog/raw/master/assets/preview3.png"/>