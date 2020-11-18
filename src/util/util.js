import { cosBucket, cosRegion } from './../config/env';
import { getApi, postApi } from '../request/http';
import COS from 'cos-js-sdk-v5';
import { cosImageUrl } from '../config/env';
import { isProxy, toRaw } from 'vue';
export const uploadImage = (fileList) => {
  return new Promise((resolve, reject) => {
    const cos = new COS({
      // 必选参数
      getAuthorization: async (options, callback) => {
        const data = await getApi('/sts');
        const credentials = data && data.credentials;
        if (!data || !credentials) {
          throw Error('服务器cos临时密钥错误');
          return console.error('credentials invalid');
        }
        callback({
          TmpSecretId: credentials.tmpSecretId,
          TmpSecretKey: credentials.tmpSecretKey,
          XCosSecurityToken: credentials.sessionToken,
          // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
          StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
          ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
        });
        // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
        // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
        // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
      },
    });
    let str = '';
    fileList.map((v, k) => {
      if (v.status === 'done') {
        str += v.uid + ',';
        if (k === fileList.length - 1) {
          console.log('<><><>');
          str = str.slice(0, str.length - 1);
          resolve(str);
        }
        return;
      }
      cos.putObject(
        {
          Bucket: cosBucket /* 必须 */,
          Region: cosRegion /* 存储桶所在地域，必须字段 */,
          Key: v.uid /* 必须 */,
          StorageClass: 'STANDARD',
          Body: v, // 上传文件对象
          onProgress: function (progressData) {
            // console.log(JSON.stringify(progressData));
          },
        },
        function (err, data) {
          if (err) resolve(false);
          str += v.uid + ',';
          console.log('uploadImage -> str', str, k);
          if (k === fileList.length - 1) {
            console.log('<><><>');
            str = str.slice(0, str.length - 1);
            resolve(str);
          }
        }
      );
    });
  });
};

export const getCosImageUrl = () => cosImageUrl;
