<template>
	<div>
			<v-container fluid>
				<v-layout class="hidden-sm-and-down" xs15 sm20 md15 row>
					<v-col md8 offset-md2>
						<v-flex v-if="instagramDetail.profile_pic_url">
							<v-img width="150px" src=instagramDetail.profile_pic_url>
							</v-img>
						</v-flex>
						<v-flex v-if="!instagramDetail.profile_pic_url">
							<v-img width="150px" src="@/assets/no_avatar.png">
							</v-img>
						</v-flex>
					</v-col>
					<v-col md8>
						<v-flex>
							<v-card-text><h2>
								Описание: {{instagramDetail.biography ? instagramDetail.biography: "отсутствует"}}</h2>
							</v-card-text>
							<v-card-actions v-if="onlyMy">
								<v-btn v-if="canDeleteAccount(instagramDetail.pk)" @click="deleteAccount(instagramDetail.pk)" dark>
									<div>Удалить аккаунт</div>
								</v-btn>
								<div v-if="!getUserDataAccount(instagramDetail.pk)">
									<v-icon dark>check</v-icon> Аккаунт удален из кабинета
								</div>
							</v-card-actions>
							<v-card-actions v-if="!onlyMy">
								<v-btn v-if="canAddAccount(instagramDetail.pk)" @click="loadAccounts(instagramDetail.pk)" dark>
									<div>Сохранить к себе</div>
								</v-btn>
								<div v-if="getUserDataAccount(instagramDetail.pk)">
									<v-icon dark>check</v-icon> Аккаунт сохранен в кабинет
								</div>
							</v-card-actions>
						</v-flex>
					</v-col>
				</v-layout>
				<v-layout class="hidden-md-and-up" xs15 sm20 md15 row>
						<v-flex v-if="instagramDetail.profile_pic_url">
							<v-img width="150px" src=instagramDetail.profile_pic_url>
							</v-img>
						</v-flex>
						<v-flex v-if="!instagramDetail.profile_pic_url">
							<v-img width="150px" src="@/assets/no_avatar.png">
							</v-img>
						</v-flex>
					
						<v-flex>
							<v-card-text><h2>
								Описание: {{instagramDetail.biography ? instagramDetail.biography: "отсутствует"}}</h2>
							</v-card-text>
							<v-card-actions v-if="onlyMy">
								<v-btn v-if="canDeleteAccount(instagramDetail.pk)" @click="deleteAccount(instagramDetail.pk)" dark>
									<div>Удалить аккаунт</div>
								</v-btn>
								<div v-if="!getUserDataAccount(instagramDetail.pk)">
									<v-icon dark>check</v-icon> Аккаунт удален из кабинета
								</div>
							</v-card-actions>
							<v-card-actions v-if="!onlyMy">
								<v-btn v-if="canAddAccount(instagramDetail.pk)" @click="loadAccounts(instagramDetail.pk)" dark>
									<div>Сохранить к себе</div>
								</v-btn>
								<div v-if="getUserDataAccount(instagramDetail.pk)">
									<v-icon dark>check</v-icon> Аккаунт сохранен в кабинет
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
    name: 'InstagramDetail',
	props: {
		'pk': {
			type: Number,
			required: true
		},
		"onlyMy": {
			type: Boolean,
			default: false
		}
	},
	computed: {
		instagramDetail() {
			return this.$store.getters.getAccounts.find(a => a.pk == this.pk)
		},
		...mapGetters(['isUserAuthenticated', 'userData', 'getProcessing'])
	},
	methods: {
		canAddAccount(accpk) {
			let account = this.getUserDataAccount(accpk)
			return this.isUserAuthenticated && !this.getProcessing && !account
		},
		canDeleteAccount(accpk) {
			let account = this.getUserDataAccount(accpk)
			return this.isUserAuthenticated && !this.getProcessing && account
		},
		getUserDataAccount(accpk) {		
			return accpk in this.userData.accounts
		},
		loadAccounts(accpk) {
			this.$store.dispatch('ADD_USER_ACCOUNT', accpk)
		},
		deleteAccount(accpk) {
			this.$store.dispatch('DELETE_USER_ACCOUNT', accpk)
		}
	}
  }
</script>
