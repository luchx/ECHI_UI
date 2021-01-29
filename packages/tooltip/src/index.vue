<script>
export default {
  name: "MTooltip",
  inheritAttrs: false,
  props: {
    // 是否只在溢出时显示 tip
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isEllipsis: false
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
      const clientWidth = el?.clientWidth;
      const scrollWidth = el.scrollWidth;
      const isEllipsis = scrollWidth > clientWidth;
      this.isEllipsis = isEllipsis;
    }
  },
  render() {
    const { $attrs, $slots, $props, $data } = this;
    const tooltipProps = {
      props: {
        ...$attrs
      }
    };
    if (!$props.ellipsis) {
      return <el-tooltip {...tooltipProps}>{$slots.default}</el-tooltip>;
    }

    return (
      <el-tooltip {...tooltipProps} disabled={!$data.isEllipsis}>
        <span class="mui-textEllipsis">{$slots.default}</span>
      </el-tooltip>
    );
  }
};
</script>
