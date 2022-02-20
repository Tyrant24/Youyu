/**
 * 配置编译线上跟线下之前的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 **/

let fileUploadAPI = 'https://cmsdev.app-link.org/alucard263096/yyxw/api/'
let imgBaseUrl = 'https://alioss.app-link.org/alucard263096/yyxw/'
let baseUrl = 'https://cmsdev.app-link.org/alucard263096/yyxw/fileupload'
if (process.env.NODE_ENV == 'development') { } else if (process.env.NODE_ENV == 'production') {
  baseUrl = 'http://shuotiku.dingerkaoyan.com.cn/'
}

export {
  baseUrl,
  imgBaseUrl,
  fileUploadAPI
};