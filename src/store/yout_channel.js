import Vue from 'vue'
export default {
	state: {
		channels: []
	},
	mutations: {
		SET_CHANNELS(state, payload) {
			state.channels = payload
		}
	},
	actions: {
		LOAD_CHANNELS({commit}) {
			Vue.$db.collection('channels')
			.get()
			.then(querySnapshot => {
				let channels = []
				querySnapshot.forEach(s => {
					const data  = s.data()
					let channel = {
						id: s.id,
						title: data.title,
						description: data.description,
						defaultLanguage: data.defaultLanguage,
						country: data.country,
						topicCategories: data.topicCategories,
						viewCount: data.viewCount,
						subscriberCount: data.subscriberCount,
						videoCount: data.videoCount
					}
					channels.push(channel)
				})
				commit('SET_CHANNELS', channels)
			})
			.catch(error => console.log(error))
		}
	},
	getters: {
		getChannels: (state) => state.channels
	},
}