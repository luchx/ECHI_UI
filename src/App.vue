<template>
	<div id="app">
		<router-link to="/button">Button 按钮</router-link>
		<router-link to="/modal">Modal 模态框</router-link>
		<div class="effect-wrapper">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>