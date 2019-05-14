<template>
    <button class="button jelly" :class="[
            type ? 'button-' + type : '',
            {'button-plain': plain},
            {'button-disabled': buttonDisabled},
            {'button-loading': loading}
        ]"
        :style="buttonStyle" @click="handleClick" :disabled="buttonDisabled || loading" :type="nativeType">
        <!-- 前置内容 -->
        <slot name="prefix">
            <i class="button-prefix iconfont" v-if="prefixIcon" v-html="prefixIcon" 
                :style="{fontSize: iconSize ? iconSize + 'px': ''}"></i>
        </slot>
        <slot></slot>
        <!-- 后置内容 -->
        <slot name="suffix">
            <i class="button-suffix iconfont" v-if="suffixIcon" v-html="suffixIcon" 
                :style="{fontSize: iconSize ? iconSize + 'px': ''}"></i>
        </slot>
    </button>
</template>
<script src="./index.js"></script>