import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
export default {
	state: {
		user: {
			isAuthenticated: false,
			email: null,
			uid: null
		},
		unsubscribeAuth: null
	},
	mutations: {
		SET_USER(state, payload) {
			state.user.isAuthenticated = true
			state.user.uid = payload.uid
			state.user.email = payload.email
		},
		SET_USER_EMAIL(state, payload) {
			state.user.email = payload
		},
		UNSET_USER(state) {
			state.user.isAuthenticated = false
			state.user.uid = null
		},
		SET_UNSUBSCRIBE_AUTH(state, payload) {
			state.unsubscribeAuth = payload
		}
	},
	actions: {
		INIT_AUTH({dispatch, commit, state}) {
			return new Promise((resolve) => {
				if (state.unsubscribeAuth) state.unsubscribeAuth()
				let unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
					dispatch('STATE_CHANGED', user)
					resolve(user)
				})
				commit('SET_UNSUBSCRIBE_AUTH', unsubscribe)
			})
		},
		REGISTER({commit}, payload) {
			commit('SET_PROCESSING', true)
			commit('CLEAR_ERROR')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
			.then(() => {
				commit('SET_PROCESSING', false)
			})		
			.catch((error) => {
				commit('SET_PROCESSING', false)
				commit('SET_ERROR', error.message)
			});
		},
		LOGIN({commit}, payload) {
			commit('SET_PROCESSING', true)
			commit('CLEAR_ERROR')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
			.then(() => {
				commit('SET_PROCESSING', false)
			})		
			.catch((error) => {
				commit('SET_PROCESSING', false)
				commit('SET_ERROR', error.message)
			});
		},
		SIGNOUT() {
			firebase.auth().signOut()
		},
		STATE_CHANGED({commit, dispatch}, payload) {
			if (payload) {
				commit('SET_USER', {uid: payload.uid, email: payload.email})
				dispatch('LOAD_USER_DATA', payload.uid)
				dispatch('LOAD_USER_DATA_YOUT', payload.uid)
			} else {
				commit('UNSET_USER')
			}
		},
		CHANGE_USER_PROFILE_DATA({commit}, payload) {
			let user = firebase.auth().currentUser
			let credential = firebase.auth.EmailAuthProvider.credential (
				payload.email,
				payload.password
			)
			
			commit('SET_PROCESSING', true)
			commit('CLEAR_ERROR')
			
			user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
				let currentUser = firebase.auth().currentUser
				if (payload.changeType == 'email') {
					currentUser.updateEmail(payload.newemail)
					.then(() => {
						commit('SET_USER_EMAIL', payload.newemail)
						commit('SET_PROCESSING', false)
					}).catch((error) => {
						commit('SET_PROCESSING', false)
						commit('SET_ERROR', error.message)
					});
				}
				if (payload.changeType == 'password') {
					currentUser.updatePassword(payload.newpassword)
					.then(() => {
						commit('SET_PROCESSING', false)
					}).catch((error) => {
						commit('SET_PROCESSING', false)
						commit('SET_ERROR', error.message)
					});
				}
			}).catch(function(error){
				commit('SET_PROCESSING', false)
				commit('SET_ERROR', error.message)
			})
		}
	},
	getters: {
		isUserAuthenticated: (state) => state.user.isAuthenticated,
		userId: (state) => state.user.uid,
		userEmail: (state) => state.user.email
	}
}