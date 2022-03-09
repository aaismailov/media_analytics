<template>
	<div>
			<v-container fluid>
				<v-layout class="hidden-sm-and-down" xs15 sm20 md15 row>
					<v-col md8 offset-md2>
						<v-flex>
							<v-card-text>
								<h2>Описание: {{youtubeDetail.description ? youtubeDetail.description: "отсутствует"}}</h2>
							</v-card-text>
							<v-card-actions v-if="onlyMy">
								<v-btn v-if="canDeleteChannel(youtubeDetail.id)" @click="deleteChannel(youtubeDetail.id)" dark>
									<div>Удалить канал</div>
								</v-btn>
								<div v-if="!getUserDataChannel(youtubeDetail.id)">
									<v-icon dark>check</v-icon> Канал удален из кабинета
								</div>
							</v-card-actions>
							<v-card-actions v-if="!onlyMy">
								<v-btn v-if="canAddChannel(youtubeDetail.id)" @click="loadChannels(youtubeDetail.id)" dark>
									<div>Сохранить к себе</div>
								</v-btn>
								<div v-if="getUserDataChannel(youtubeDetail.id)">
									<v-icon dark>check</v-icon> Канал сохранен в кабинет
								</div>
							</v-card-actions>
						</v-flex>
					</v-col>
					<v-col md8>
						<v-flex>
							<v-card-title><h4>
								<div>
									<div v-if="youtubeDetail.defaultLanguage">Язык: {{youtubeDetail.defaultLanguage}}</div>
									<div v-if="youtubeDetail.country">Страна: {{youtubeDetail.country}}</div>
									<div v-if="youtubeDetail.topicCategories">Категории:</div>
									<div v-if="youtubeDetail.topicCategories">
										<div v-for="(cat, i) in youtubeDetail.topicCategories" :key="'cat'+i">
										<v-chip dark :color="i%2==0 ? 'orange lighten-1': 'blue  lighten-2'">{{cat}}</v-chip></div>
									</div>
								</div></h4>
							</v-card-title>
						</v-flex>
					</v-col>
				</v-layout>
				<v-layout class="hidden-md-and-up" xs15 sm20 md15 row>
					<v-flex>
							<v-card-text>
								<h2>Описание: {{youtubeDetail.description ? youtubeDetail.description: "отсутствует"}}</h2>
							</v-card-text>
							<v-card-title><h3>
								<div>
									<div v-if="youtubeDetail.defaultLanguage">Язык: {{youtubeDetail.defaultLanguage}}</div>
									<div v-if="youtubeDetail.country">Страна: {{youtubeDetail.country}}</div>
									<div v-if="youtubeDetail.topicCategories">Категории:</div>
									<div v-if="youtubeDetail.topicCategories">
										<div v-for="(cat, i) in youtubeDetail.topicCategories" :key="'cat'+i">
										<v-chip dark :color="i%2==0 ? 'orange lighten-1': 'blue  lighten-2'">{{cat}}</v-chip></div>
									</div>
								</div></h3>
							</v-card-title>
							<v-card-actions v-if="onlyMy">
								<v-btn v-if="canDeleteChannel(youtubeDetail.id)" @click="deleteChannel(youtubeDetail.id)" dark>
									<div>Удалить канал</div>
								</v-btn>
								<div v-if="!getUserDataChannel(youtubeDetail.id)">
									<v-icon dark>check</v-icon> Канал удален из кабинета
								</div>
							</v-card-actions>
							<v-card-actions v-if="!onlyMy">
								<v-btn v-if="canAddChannel(youtubeDetail.id)" @click="loadChannels(youtubeDetail.id)" dark>
									<div>Сохранить к себе</div>
								</v-btn>
								<div v-if="getUserDataChannel(youtubeDetail.id)">
									<v-icon dark>check</v-icon> Канал сохранен в кабинет
								</div>
							</v-card-actions>
						</v-flex>
				</v-layout>
			</v-container>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'YoutubeDetail',
	props: {
		'id': {
			type: String,
			required: true
		},
		"onlyMy": {
			type: Boolean,
			default: false
		}
	},
	computed: {
		youtubeDetail() {
			return this.$store.getters.getChannels.find(a => a.id == this.id)
		},
		...mapGetters(['isUserAuthenticated', 'userDataYout', 'getProcessing'])
	},
	methods: {
		canAddChannel(chkey) {
			let channel = this.getUserDataChannel(chkey)
			return this.isUserAuthenticated && !this.getProcessing && !channel
		},
		canDeleteChannel(chkey) {
			let channel = this.getUserDataChannel(chkey)
			return this.isUserAuthenticated && !this.getProcessing && channel
		},
		getUserDataChannel(chkey) {		
			return chkey in this.userDataYout.channels
		},
		loadChannels(chkey) {
			this.$store.dispatch('ADD_USER_CHANNEL', chkey)
		},
		deleteChannel(chkey) {
			this.$store.dispatch('DELETE_USER_CHANNEL', chkey)
		}
	}
  }
</script>
