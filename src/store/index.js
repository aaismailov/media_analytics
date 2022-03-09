import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import generalModule from './general'
import instModule from './inst_account'
import youtModule from './yout_channel'
import userDataModule from './user_data'
import userDataYoutModule from './user_data_yout'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		userModule,
		generalModule,
		instModule,
		youtModule,
		userDataModule,
		userDataYoutModule
	}
})