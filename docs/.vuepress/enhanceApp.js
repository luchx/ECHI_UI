import "./public/styles/theme.scss";

import mui from "../../lib/index";

const getHandler = (variable, id) => {
  let styleTag = document.getElementById(id);
  if (!styleTag) {
    styleTag = document.createElement("link");
    styleTag.setAttribute("id", id);
    styleTag.setAttribute("rel", "stylesheet");
    styleTag.setAttribute("type", "text/css");
    document.head.appendChild(styleTag);
  }
  styleTag.href = `/theme/${variable}.css`;
};

const localKey = localStorage.getItem("theme");
if (localKey) {
  getHandler(`theme-${localKey}`, "chalk-origin");
}

export default ({ Vue, options, router }) => {
  Vue.use(ElementUI);
  Vue.use(mui);

  // 选择需要观察变动的节点
  const targetNode = document.querySelector("body");
  // 观察器的配置（需要观察什么变动）
  const config = {
    attributes: true,
    attributeFilter: ["class"]
  };
  // 当观察到变动时执行的回调函数
  const callback = function(mutationsList, observer) {
    mutationsList.forEach(function(record) {
      if (record.type === "attributes") {
        const target = record.target;

        console.log(target.classList.contains("theme-red"));

        const colorMap = ["red", "green", "orange", "purple"];
        const theme =
          colorMap.find(key => target.classList.contains(`theme-${key}`)) ||
          "blue";

        getHandler(`theme-${theme}`, "chalk-style");
      }
    });
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config);
};
