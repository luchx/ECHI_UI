<template>
  <component
    :is="type"
    :name="name"
    :tag="tag"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "Animation",
  props: {
    name: {
      type: String,
      default: "fade",
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        const animationGroup = ["stamp", "fade", "list", "toggle"];
        return animationGroup.includes(value);
      }
    },
    duration: {
      type: Number,
      default: 300
    },
    group: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    type() {
      return this.group ? "transition-group" : "transition";
    }
  }
};
</script>
<style lang="scss" scoped>
.stamp-enter-active {
  animation: stamp-in 0.3s;
}

.stamp-leave-active {
  animation: stamp-in 0.3s reverse;
}

@keyframes stamp-in {
  0% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transform: scaleY(1);
  transform-origin: top;
  transition: transform ease 0.3s;
}
.fade-enter,
.fade-leave-to {
  transform: scaleY(0);
}

.list-enter-active,
.list-leave-active {
  transition: all ease 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.toggle-enter-active,
.toggle-leave-active {
  opacity: 1;
  transform: scale(1);
  transition: transform ease 0.2s;
}
.toggle-enter,
.toggle-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
