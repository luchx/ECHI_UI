/**
 * 判断对象类型
 * @param [obj: any] 参数对象
 * @returns String
 */
export function type(obj: any) {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase();
}

/**
 * 复制到剪切板
 * @param code 复制内容
 * @param callback 回调提示
 */
export default function copyToClipboard(code: string, callback: Function) {
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
  type(callback) === "function" && callback();
  document.body.removeChild(textAreaElement);
  // recover the previous selection
  if (selectedRange && selection) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }
}
