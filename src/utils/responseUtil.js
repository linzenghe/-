import { Message } from 'element-ui';

/**
 * 解析数据服务返回的错误日志
 * @param response
 */
export function parseDsErrorMessage(response) {
  if (response.success) {
    return;
  }
  let errorMsg = '';
  response.fieldErrors.map(err => {
    errorMsg += ',' + err.message;
  });
  Message({
    message: '请求错误: ' + errorMsg.substring(1),
    type: 'error',
    duration: 5 * 1000
  });
}
