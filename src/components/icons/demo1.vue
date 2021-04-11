<template>
  <div class="box">
    <el-input
      class="box-search"
      v-model="searchIcon"
      placeholder="在此搜索图标，点击图标可复制代码"
      suffix-icon="el-icon-search"
    />
    <div
      class="item"
      v-for="icon in iconFilterList"
      :key="icon"
      @click="handleClick(icon)"
    >
      <i :class="`icon el-icon-${icon}`"></i>
      <div class="icon-text">{{ icon }}</div>
    </div>
  </div>
</template>

<script>
import { utils } from "mui/shared";

export default {
  name: "IconsDemo1",
  data() {
    return {
      searchIcon: "",
      iconList: [
        "delete-solid",
        "delete",
        "s-tools",
        "setting",
        "user-solid",
        "user",
        "phone",
        "phone-outline",
        "more",
        "more-outline",
        "star-on",
        "star-off",
        "s-goods",
        "goods",
        "warning",
        "warning-outline",
        "question",
        "info",
        "remove",
        "circle-plus",
        "success",
        "error",
        "zoom-in",
        "zoom-out",
        "remove-outline",
        "circle-plus-outline",
        "circle-check",
        "circle-close",
        "s-help",
        "help",
        "minus",
        "plus",
        "check",
        "close",
        "picture",
        "picture-outline",
        "picture-outline-round",
        "upload",
        "upload2",
        "download",
        "camera-solid",
        "camera",
        "video-camera-solid",
        "video-camera",
        "message-solid",
        "bell",
        "s-cooperation",
        "s-order",
        "s-platform",
        "s-fold",
        "s-unfold",
        "s-operation",
        "s-promotion",
        "s-home",
        "s-release",
        "s-ticket",
        "s-management",
        "s-open",
        "s-shop",
        "s-marketing",
        "s-flag",
        "s-comment",
        "s-finance",
        "s-claim",
        "s-custom",
        "s-opportunity",
        "s-data",
        "s-check",
        "s-grid",
        "menu",
        "share",
        "d-caret",
        "caret-left",
        "caret-right",
        "caret-bottom",
        "caret-top",
        "bottom-left",
        "bottom-right",
        "back",
        "right",
        "bottom",
        "top",
        "top-left",
        "top-right",
        "arrow-left",
        "arrow-right",
        "arrow-down",
        "arrow-up",
        "d-arrow-left",
        "d-arrow-right",
        "video-pause",
        "video-play",
        "refresh",
        "refresh-right",
        "refresh-left",
        "finished",
        "sort",
        "sort-up",
        "sort-down",
        "rank",
        "loading",
        "view",
        "c-scale-to-original",
        "date",
        "edit",
        "edit-outline",
        "folder",
        "folder-opened",
        "folder-add",
        "folder-remove",
        "folder-delete",
        "folder-checked",
        "tickets",
        "document-remove",
        "document-delete",
        "document-copy",
        "document-checked",
        "document",
        "document-add",
        "printer",
        "paperclip",
        "takeaway-box",
        "search",
        "monitor",
        "attract",
        "mobile",
        "scissors",
        "umbrella",
        "headset",
        "brush",
        "mouse",
        "coordinate",
        "magic-stick",
        "reading",
        "data-line",
        "data-board",
        "pie-chart",
        "data-analysis",
        "collection-tag",
        "film",
        "suitcase",
        "suitcase-1",
        "receiving",
        "collection",
        "files",
        "notebook-1",
        "notebook-2",
        "toilet-paper",
        "office-building",
        "school",
        "table-lamp",
        "house",
        "no-smoking",
        "smoking",
        "shopping-cart-full",
        "shopping-cart-1",
        "shopping-cart-2",
        "shopping-bag-1",
        "shopping-bag-2",
        "sold-out",
        "sell",
        "present",
        "box",
        "bank-card",
        "money",
        "coin",
        "wallet",
        "discount",
        "price-tag",
        "news",
        "guide",
        "male",
        "female",
        "thumb",
        "cpu",
        "link",
        "connection",
        "open",
        "turn-off",
        "set-up",
        "chat-round",
        "chat-line-round",
        "chat-square",
        "chat-dot-round",
        "chat-dot-square",
        "chat-line-square",
        "message",
        "postcard",
        "position",
        "turn-off-microphone",
        "microphone",
        "close-notification",
        "bangzhu",
        "time",
        "odometer",
        "crop",
        "aim",
        "switch-button",
        "full-screen",
        "copy-document",
        "mic",
        "stopwatch",
        "medal-1",
        "medal",
        "trophy",
        "trophy-1",
        "first-aid-kit",
        "discover",
        "place",
        "location",
        "location-outline",
        "location-information",
        "add-location",
        "delete-location",
        "map-location",
        "alarm-clock",
        "timer",
        "watch-1",
        "watch",
        "lock",
        "unlock",
        "key",
        "service",
        "mobile-phone",
        "bicycle",
        "truck",
        "ship",
        "basketball",
        "football",
        "soccer",
        "baseball",
        "wind-power",
        "light-rain",
        "lightning",
        "heavy-rain",
        "sunrise",
        "sunrise-1",
        "sunset",
        "sunny",
        "cloudy",
        "partly-cloudy",
        "cloudy-and-sunny",
        "moon",
        "moon-night",
        "dish",
        "dish-1",
        "food",
        "chicken",
        "fork-spoon",
        "knife-fork",
        "burger",
        "tableware",
        "sugar",
        "dessert",
        "ice-cream",
        "hot-water",
        "water-cup",
        "coffee-cup",
        "cold-drink",
        "goblet",
        "goblet-full",
        "goblet-square",
        "goblet-square-full",
        "refrigerator",
        "grape",
        "watermelon",
        "cherry",
        "apple",
        "pear",
        "orange",
        "coffee",
        "ice-tea",
        "ice-drink",
        "milk-tea",
        "potato-strips",
        "lollipop",
        "ice-cream-square",
        "ice-cream-round"
      ]
    };
  },
  computed: {
    iconFilterList() {
      if (!this.searchIcon) {
        return this.iconList;
      }
      return this.iconList.filter(icon => icon.includes(this.searchIcon));
    }
  },
  methods: {
    handleClick(icon) {
      const code = `<i class="el-icon-${icon}"></i>`;
      utils.copyToClipboard(code, () => {
        this.$message({
          message: `${code} copied 🎉`,
          type: "success"
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: block;
  width: calc(100% / 6);
  text-align: center;
  height: 120px;
  color: #666;
  font-size: 13px;
  margin-right: -1px;
  margin-bottom: -1px;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: $--color-primary;
    .icon {
      color: #fff;
      transform: scale(1.4);
    }
    .icon-text {
      color: #fff;
    }
  }
  .icon {
    display: block;
    font-size: 32px;
    margin-top: 24px;
    margin-bottom: 15px;
    color: #606266;
    transition: transform 0.3s ease-in-out;
    will-change: transform;
  }
}

.icon-text {
  font-size: 14px;
  color: #666;
  padding: 0 16px;
}

.box-search {
  margin-top: 24px;
  margin-bottom: 24px;
}
</style>
