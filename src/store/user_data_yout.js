import Vue from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default {
	state: {
		userDataYout: {
			channels: {}
		}
	},
	mutations: {
		SET_USER_DATA_YOUT(state, payload) {
			state.userDataYout = payload
		},
		ADD_USER_CHANNEL(state, payload) {
			Vue.set(state.userDataYout.channels, payload.chkey, payload.channel)
		},
		DELETE_USER_CHANNEL(state, payload) {
			Vue.delete(state.userDataYout.channels, payload)
		}
	},
	actions: {
		LOAD_USER_DATA_YOUT({commit}, payload) {
			commit('SET_PROCESSING', true)
			let userDataRef = Vue.$db.collection('userDataYout').doc(payload)
			userDataRef.get()
			.then((data) => {
				let userDataYout = data.exists ? data.data() : { channels: {} }
				if(!userDataYout)
					userDataYout = {channels: {}}
				commit('SET_USER_DATA_YOUT', userDataYout)
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		},
		ADD_USER_CHANNEL({commit, getters}, payload) {
			commit('SET_PROCESSING', true)
			let channel = {addedDate: new Date()}
			
			Vue.$db.collection('userDataYout').doc(getters.userId).set({
				channels: {
					[payload]: channel
				}
			}, {merge: true})
			.then(() => {
				commit('ADD_USER_CHANNEL', {chkey: payload, channel: channel})
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		},
		DELETE_USER_CHANNEL({commit, getters}, payload) {
			commit('SET_PROCESSING', true)
			
			Vue.$db.collection('userDataYout').doc(getters.userId).update({
				["channels."+payload]: firebase.firestore.FieldValue.delete()
			})
			.then(() => {
				commit('DELETE_USER_CHANNEL', payload)
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		}
	},
	getters: {
		userDataYout: (state) => state.userDataYout
	},
}