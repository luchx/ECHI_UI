export default {
    name: "CModal",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "标题"
        },
        text: {
            type: String,
            default: "提示信息"
        },
        confirmBtnText: {
            type: String,
            default: "确定"
        },
        cancelBtnText: {
            type: String,
            default: "返回"
        },
        contentStyle: {
            type: Object,
            default: () => { }
        },
        showClose: {
            type: Boolean,
            default: true
        },
        plain: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showMask: {
            type: Boolean,
            default: true
        },
        onMask: {
            type: Boolean,
            default: false
        },
        // 如果设定的数值小于10,则会乘以1000;否则按传递的数值计算
        duration: {
            type: Number,
            default: 0
        }
    },
    watch: {
        visible(nv) {
            if (nv) {
                this.closeTimerHandle()
            }
        }
    },
    data() {
        return {
            closeTimer: null,
        }
    },
    methods: {
        onClose() {
            this.$emit("on-close");
            this.hide();
        },
        onConfirm() {
            this.$emit("on-confirm");
        },
        hide() {
            this.$emit("update:visible", false);
            this.$emit("on-closed");
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        },
        clickMask() {
            if (this.onMask && this.showMask) {
                this.hide();
            }
        },
        closeTimerHandle() {
            try {
                if (this.duration <= 0) {
                    return;
                }
                const duration = (this.duration < 10) ? (this.duration * 1000) : this.duration;
                clearTimeout(this.closeTimer);
                this.closeTimer = setTimeout(() => {
                    this.onClose();
                }, duration);
            } catch (e) {
                console.log(e)
            }
        }
    }
};