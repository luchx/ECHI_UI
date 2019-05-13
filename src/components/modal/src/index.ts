import {
    Component,
    Prop,
    Vue,
    Watch
} from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
    closeTimer: any = null;

    @Prop({
        type: Boolean,
        default: false
    }) visible;

    @Prop({
        type: String,
        default: '标题'
    }) title;

    @Prop({
        type: String,
        default: '提示信息'
    }) text;

    @Prop({
        type: String,
        default: '确定'
    }) confirmBtnText;

    @Prop({
        type: String,
        default: '返回'
    }) cancelBtnText;

    @Prop({
        type: Object,
        default: () => {}
    }) contentStyle;

    @Prop({
        type: Boolean,
        default: true
    }) showClose;

    @Prop({
        type: Boolean,
        default: false
    }) plain;

    @Prop({
        type: Boolean,
        default: true
    }) showHeader;

    @Prop({
        type: Boolean,
        default: true
    }) showFooter;

    @Prop({
        type: Boolean,
        default: true
    }) showMask;

    @Prop({
        type: Boolean,
        default: false
    }) onMask;
    // 如果设定的数值小于10,则会乘以1000;否则按传递的数值计算
    @Prop({
        type: Number,
        default: 0
    }) duration;


    @Watch('visible')
    WatchVisible(nv) {
        if (nv) {
            this.closeTimerHandle();
        }
    }

    onClose() {
        this.$emit('on-close');
        this.hide();
    }

    onConfirm() {
        this.$emit('on-confirm');
    }

    hide() {
        this.$emit('update:visible', false);
        this.$emit('on-closed');
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
    }

    clickMask() {
        if (this.onMask && this.showMask) {
            this.hide();
        }
    }

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
            console.log(e);
        }
    }
}