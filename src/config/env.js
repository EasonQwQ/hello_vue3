/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl;
let routerMode;
const imgBaseUrl =
  'https://office-website-1300901841.cos.ap-nanjing.myqcloud.com/images/';
const baseImageUrl =
  'https://office-website-1300901841.cos.ap-nanjing.myqcloud.com/images/';
const cosBucket = 'outdoor-1255632723';
const cosRegion = 'ap-nanjing';
const cosImageUrl = 'http://outdoor-1255632723.cos.ap-nanjing.myqcloud.com/';
if (process.env.NODE_ENV == 'development') {
  baseUrl = '';
  routerMode = 'hash';
} else {
  baseUrl = 'https://mainsite-restapi.ele.me';
  routerMode = 'hash';
}

export { baseUrl, routerMode, imgBaseUrl, baseImageUrl, cosBucket, cosRegion ,cosImageUrl};
