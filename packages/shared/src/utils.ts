/**
 * 判断对象类型
 * @param obj 当前对象
 * @param type 对象类型
 * @returns boolean
 */
export function type(obj: any, type: string) {
  const value = Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase();

  return value === type;
}

/**
 * 复制到剪切板
 * @param code 复制内容
 * @param callback 回调提示
 */
export function copyToClipboard(code: string, callback: Function) {
  const selection = document.getSelection();
  /** current selection */
  const selectedRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  const textAreaElement = document.createElement("textarea");
  textAreaElement.value = code;
  textAreaElement.setAttribute("readonly", "");
  textAreaElement.style.position = "absolute";
  textAreaElement.style.top = "-9999px";
  document.body.appendChild(textAreaElement);
  textAreaElement.select();
  document.execCommand("copy");
  type(callback, "function") && callback();
  document.body.removeChild(textAreaElement);
  // recover the previous selection
  if (selectedRange && selection) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }
}

/**
 * 高亮文字
 * @param code 文字数据
 * @param keyword 关键字
 * @param color 字体展示颜色
 */
export function highlineText(code: string, keyword: string, color = "#ff0000") {
  if (!keyword || !keyword.trim()) {
    return code;
  }
  const reg = new RegExp(keyword, "ig");
  return code.replace(reg, `<span style="color: ${color}">${keyword}</span>`);
}

/**
 * px 转换
 * @param value
 */
export function transformPx(value: string | number) {
  if (type(value, "number")) {
    return `${value}px`;
  }
  return value;
}

/**
 * 递归读取对象上属性
 * @param obj eg: {a:{b:{c:1}}}
 * @param path  eg: 'a.b.c'
 */
export function getPropByPath(obj: Record<string, any>, path: string) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  const keyArr = path.split(".");
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      throw new Error("please transfer a valid prop path to form item!");
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
}

/**
 * 生成随机 uuid
 * @returns
 */
export function uuid() {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.substr(uuid.lastIndexOf("/") + 1);
}
