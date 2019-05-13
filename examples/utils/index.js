// 返回空对象
export const noop = () => { };

/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function isType(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
}

/**
 * 判断是否非空
 * @param [object: any] 参数对象
 * @returns Boolean
 */
export function isNotEmpty(object) {
  const type = isType(object);
  if (type === 'array') {
    return !!object.length;
  } else if (type === 'object') {
    return !!Object.keys(object).length;
  } else if (type === 'string') {
    return !!object.length;
  } else if (type === 'boolean') {
    return object;
  } else {
    return false;
  }
}

// 不足10补0
export function fixTen(num) {
  return ('0' + num).slice(-2);
}