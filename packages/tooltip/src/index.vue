<script>
export default {
  name: "MTooltip",
  inheritAttrs: false,
  props: {
    // 是否只在溢出时显示 tip
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ellipsis: false
    };
  },
  mounted() {
    this.calcTips();
    this.$el.addEventListener("mouseenter", this.calcTips);
  },
  beforeDestroy() {
    this.$el.removeEventListener("mouseenter", this.calcTips);
  },
  methods: {
    calcTips() {
      const el = this.$el;
      const clientWidth = el.clientWidth;
      const scrollWidth = el.scrollWidth;
      const ellipsis = scrollWidth > clientWidth;
      this.ellipsis = ellipsis;
    }
  },
  render() {
    const { $attrs, $slots, $props, $data } = this;
    const tooltipProps = {
      props: {
        ...$attrs
      }
    };
    if (!$props.showOverflowTooltip) {
      return <el-tooltip {...tooltipProps}>{$slots.default}</el-tooltip>;
    }

    return (
      <el-tooltip {...tooltipProps} disabled={!$data.ellipsis}>
        <span class="mui-textEllipsis">{$slots.default}</span>
      </el-tooltip>
    );
  }
};
</script>
