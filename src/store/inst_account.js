import Vue from 'vue'
export default {
	state: {
		accounts: []
	},
	mutations: {
		SET_ACCOUNTS(state, payload) {
			state.accounts = payload
		}
	},
	actions: {
		LOAD_ACCOUNTS({commit}) {
			Vue.$db.collection('accounts')
			.get()
			.then(querySnapshot => {
				let accounts = []
				querySnapshot.forEach(s => {
					const data  = s.data()
					let account = {
						pk: parseInt(s.id),
						username: data.username,
						full_name: data.full_name,
						is_private: data.is_private,
						profile_pic_url: data.profile_pic_url,
						is_verified: data.is_verified,
						media_count: data.media_count,
						follower_count: data.follower_count,
						following_count: data.following_count,
						biography: data.biography,
						external_url: data.external_url,
						is_business: data.is_business
					}
					accounts.push(account)
				})
				commit('SET_ACCOUNTS', accounts)
			})
			.catch(error => console.log(error))
		}
	},
	getters: {
		getAccounts: (state) => state.accounts
	},
}