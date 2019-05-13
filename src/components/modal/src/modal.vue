<template>
    <transition name="toggle">
        <section class="modal" v-show="visible">
            <div class="modal-mask" v-show="showMask" @click="clickMask"></div>
            <section class="modal-content modal-center" :style="contentStyle">
                <header class="modal-header" :class="{ 'modal-plain': plain }" v-if="showHeader">
                    <slot name="header">{{ title }}</slot>
                    <span class="closed" v-if="showClose" @click.stop="onClose">
                        关闭
                    </span>
                </header>
                <main class="modal-body">
                    <slot>
                        <div class="text-tips">{{ text }}</div>
                    </slot>
                </main>
                <footer class="modal-footer" v-if="showFooter">
                    <slot name="footer">
                        <button class="modal-btn modal-btn-primary" @click.stop="onConfirm">
                            {{ confirmBtnText }}
                        </button>
                        <button class="modal-btn modal-btn-default" @click.stop="onClose">
                            {{ cancelBtnText }}
                        </button>
                    </slot>
                </footer>
            </section>
        </section>
    </transition>
</template>

<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss" scoped></style>