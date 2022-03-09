import Vue from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default {
	state: {
		userData: {
			accounts: {}
		}
	},
	mutations: {
		SET_USER_DATA(state, payload) {
			state.userData = payload
		},
		ADD_USER_ACCOUNT(state, payload) {
			Vue.set(state.userData.accounts, payload.accpk, payload.account)
		},
		DELETE_USER_ACCOUNT(state, payload) {
			Vue.delete(state.userData.accounts, payload)
		}
	},
	actions: {
		LOAD_USER_DATA({commit}, payload) {
			commit('SET_PROCESSING', true)
			let userDataRef = Vue.$db.collection('userData').doc(payload)
			userDataRef.get()
			.then((data) => {
				let userData = data.exists ? data.data() : { accounts: {} }
				if(!userData)
					userData = {accounts: {}}
				commit('SET_USER_DATA', userData)
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		},
		ADD_USER_ACCOUNT({commit, getters}, payload) {
			commit('SET_PROCESSING', true)
			let acc = {addedDate: new Date()}
			
			Vue.$db.collection('userData').doc(getters.userId).set({
				accounts: {
					[payload]: acc
				}
			}, {merge: true})
			.then(() => {
				commit('ADD_USER_ACCOUNT', {accpk: payload, account: acc})
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		},
		DELETE_USER_ACCOUNT({commit, getters}, payload) {
			commit('SET_PROCESSING', true)
			
			Vue.$db.collection('userData').doc(getters.userId).update({
				["accounts."+payload]: firebase.firestore.FieldValue.delete()
			})
			.then(() => {
				commit('DELETE_USER_ACCOUNT', payload)
				commit('SET_PROCESSING', false)
			})
			.catch(() => {
				commit('SET_PROCESSING', false)
			})
		}
	},
	getters: {
		userData: (state) => state.userData
	},
}