import {
    Component,
    Inject,
    Prop,
    Vue
} from 'vue-property-decorator';

import {
    setToPx
} from '@/utils/dom';

@Component
export default class Button extends Vue {

    // 图标尺寸
    @Prop(Number) iconSize!: number;
    // 前置图标
    @Prop({
        type: String,
        default: ''
    }) prefixIcon!: string;
    // 后置图标
    @Prop({
        type: String,
        default: ''
    }) suffixIcon!: string;
    // 按钮类型
    @Prop({
        type: String,
        default: 'button'
    }) nativeType!: string;
    // 按钮样式 default, primary, info, danger
    @Prop({
        type: String,
        default: 'default'
    }) type!: string;
    // button的高度
    @Prop(Number) height!: number;
    // button的宽度
    @Prop(Number) width!: number;
    // button的字体大小
    @Prop(Number) fontSize!: number;
    // 是否朴素风格
    @Prop(Boolean) plain!: boolean;
    // 定义圆角
    @Prop(Number) radius!: number;
    // 是否去除边框
    @Prop(Boolean) noBorder!: boolean;
    // 是否禁用
    @Prop(Boolean) disabled!: boolean;
    // 是否禁用
    @Prop(Boolean) loading!: boolean;

    @Inject({
        default: {}
    }) Form!: any;

    get buttonDisabled() {
        return this.disabled || (this.Form || {}).disabled;
    }

    get buttonStyle() {
        let ret: any = {};
        if (this.noBorder) {
            ret['borderColor'] = 'transparent';
            ret['backgroundColor'] = 'transparent';
        }
        if (typeof this.radius !== 'undefined') {
            ret['borderRadius'] = setToPx(this.radius);
        }
        if (this.width) {
            ret['width'] = setToPx(this.width);
        }
        if (this.height) {
            ret['height'] = setToPx(this.height);
        }
        if (this.fontSize) {
            ret['fontSize'] = setToPx(this.fontSize);
        }
        return ret;
    }

    handleClick(evt: any) {
        this.$emit('click', evt);
    }
}