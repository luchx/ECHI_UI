import {
    setToPx
} from '@/utils/dom';

export default {
    name: 'CButton',
    props: {
        // 图标尺寸
        iconSize: {
            type: Number
        },
        // 前置图标
        prefixIcon: {
            type: String,
            default: ''
        },
        // 后置图标
        suffixIcon: {
            type: String,
            default: ''
        },
        // 按钮类型
        nativeType: {
            type: String,
            default: 'button'
        },
        // 按钮样式 default, primary, info, danger
        type: {
            type: String,
            default: 'default'
        },
        // button的高度
        height: {
            type: Number
        },
        // button的宽度
        width: {
            type: Number
        },
        // button的字体大小
        fontSize: {
            type: Number
        },
        // 是否朴素风格
        plain: {
            type: Boolean
        },
        // 定义圆角
        radius: {
            type: Number
        },
        // 是否去除边框
        noBorder: {
            type: Boolean
        },
        // 是否禁用
        disabled: {
            type: Boolean
        },
        // 是否loading
        loading: {
            type: Boolean
        },
    },
    computed: {
        buttonDisabled() {
            return this.disabled || (this.Form || {}).disabled;
        },
        buttonStyle() {
            let ret = {};
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
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
}