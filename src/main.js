import { createSSRApp } from "vue";

import uviewPlus from 'uview-plus'
import { createPinia } from 'pinia'


import App from "./App.vue";

export function createApp() {
	const app = createSSRApp(App);

	app.use(uviewPlus)
	// 引入pina
	app.use(createPinia())


	return {
		app,
	};
}
