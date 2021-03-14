import Vue from 'vue'
import App from './App.vue'
import { create, all } from 'mathjs'
const config = {
  number:'Number',
  precision:16
}
const math = create(all,config)

Vue.prototype.$math = math
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
