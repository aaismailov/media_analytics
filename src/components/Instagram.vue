<template>
	<v-container grid-list-md>
		<h1 v-if="!onlyMy" class="display-2 font-weight-bold mb-3" style="margin-top: 10px">
			Instagram
        </h1>
		<v-layout row wrap>
			<v-flex xs12 sm10 md15 offset-sm1 offset-md1>
				<v-container fluid>
					<v-layout row>
						<v-flex>
							<div id="v-model-multiple-checkboxes">
								<div style="margin-top: 15px">
									<input type="checkbox" id="businessCheck" value="businessCheck" v-model="checks" />
									<label for="businessCheck"> Бизнес-аккаунт</label>
								</div>
								<div style="margin-top: 15px">
									<input type="checkbox" id="verifiedCheck" value="verifiedCheck" v-model="checks" />
									<label for="verifiedCheck"> Подтверженный профиль</label>
								</div>
								<div style="margin-top: 15px">
									<input type="checkbox" id="privateCheck" value="privateCheck" v-model="checks" />
									<label for="privateCheck"> Закрытый профиль</label>
								</div>
							</div>
						</v-flex>
						<v-flex>
							<div>
								<v-text-field label="Поиск аккаунта" v-model="searchTerm"></v-text-field>
								<v-text-field label="Подписчиков больше, чем" v-model="followersMoreThen"></v-text-field>
								<v-btn text @click="sortFollowers" v-model="sortTerm">
									<v-icon v-html="iconType" left></v-icon>
									Сортировать по популярности
								</v-btn>
							</div>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
			<v-flex v-for="account in filteredAccounts" :key="account.pk" xs15 sm15 md15 offset-sm1 offset-md1>
				<instagram-item :onlyMy="onlyMy" :account="account">
				</instagram-item>
			</v-flex>
		</v-layout>
		<v-slide-y-reverse-transition>
			<v-btn class="scroll" v-show="isActive" dark color="orange" fab fixed bottom right id="toTop" @click="toTop(step)">
				<v-icon>arrow_upward</v-icon>
			</v-btn>
		</v-slide-y-reverse-transition>
	</v-container>
</template>

<script>
import InstagramItem from './InstagramItem'
export default {
    name: 'Instagram',
	data() {
		return {
			searchTerm: null,
			checks: [],
			followersMoreThen: null,
			sortTerm: 3,
			iconType: "",
			isActive: false
		}
	},
	props: {
		step: {   // Контроль скорости
			type: Number,
			default: 800
		},
		"onlyMy": {
			type: Boolean,
			default: false
		}
	},
	methods: {
		sortFollowers() {
			if (this.sortTerm == 3) {
				this.sortTerm = 1
				this.iconType = "arrow_upward"
				
			}
			else if (this.sortTerm == 1) {
				this.sortTerm = 2
				this.iconType = "arrow_downward"
				
			}
			else if (this.sortTerm == 2) {
				this.sortTerm = 3
				this.iconType = ""
			}
		},
		handleScroll () {
			if (document.documentElement.scrollTop > 50) {
				this.isActive = true
			} else {
				this.isActive = false
			}
		},
		toTop(step){
			document.documentElement.scrollTop-=step;
			if (document.documentElement.scrollTop>0) {
				var time=setTimeout(()=>this.toTop(step),15);
			}else {
				clearTimeout(time);
			}
		},
		openDetail() {
			this.detailed = !this.detailed
			console.log(this.detailed)
		},
	},
	components: {
		InstagramItem
	},
    computed: {
		accounts() {
			return this.$store.getters.getAccounts
		},
		filteredAccounts() {
			let accounts = [...this.accounts]
			if (this.onlyMy)
				accounts = accounts.filter(a => (a.pk in this.$store.getters.userData.accounts))
			if (this.sortTerm == 1)
				accounts = accounts.sort((a, b) => a.follower_count - b.follower_count)
			if (this.sortTerm == 2)
				accounts = accounts.sort((a, b) => b.follower_count - a.follower_count)
			if (this.sortTerm == 3 && !this.onlyMy)
				accounts = this.$store.getters.getAccounts
			if (this.searchTerm)
				accounts = accounts.filter(a => a.username.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
				|| a.full_name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)
			if (this.checks.filter(elem => elem == "businessCheck").length > 0)
				accounts = accounts.filter(a => a.is_business)
			if (this.checks.filter(elem => elem == "verifiedCheck").length > 0)
				accounts = accounts.filter(a => a.is_verified)
			if (this.checks.filter(elem => elem == "privateCheck").length > 0)
				accounts = accounts.filter(a => a.is_private)
			if (this.followersMoreThen)
				accounts = accounts.filter(a => a.follower_count > this.followersMoreThen)
			return accounts
		}
	},
	mounted () {
		window.addEventListener('scroll', this.handleScroll)
	},
  }
</script>