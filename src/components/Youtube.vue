<template>
	<v-container grid-list-md>
		<h1 v-if="!onlyMy" class="display-2 font-weight-bold mb-3" style="margin-top: 10px">
			YouTube
        </h1>
		<v-layout row wrap>
			<v-flex xs12 sm10 md15 offset-sm1 offset-md1>
				<v-container fluid>
					<v-layout row>
						<v-flex>
							<div>
								<v-text-field label="Поиск аккаунта" v-model="searchTerm"></v-text-field>
								<v-btn text @click="sortSubscribers" v-model="sortTerm">
									<v-icon v-html="iconType" left></v-icon>
									Сортировать по популярности
								</v-btn>
							</div>
						</v-flex>
						<v-flex>
							<div>
								<v-text-field label="Подписчиков больше, чем" v-model="subscribersMoreThen"></v-text-field>
								<v-text-field label="Просмотров больше, чем" v-model="viewsMoreThen"></v-text-field>
							</div>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
			<v-flex v-for="channel in filteredChannels" :key="channel.id" xs15 sm15 md15 offset-sm1 offset-md1>
				<youtube-item :onlyMy="onlyMy" :channel="channel">
				</youtube-item>
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
export default {
    name: 'Youtube',
	data() {
		return {
			searchTerm: null,
			subscribersMoreThen: null,
			viewsMoreThen: null,
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
		sortSubscribers() {
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
    computed: {
		channels() {
			return this.$store.getters.getChannels
		},
		filteredChannels() {
			let channels = [...this.channels]
			if (this.onlyMy)
				channels = channels.filter(a => (a.id in this.$store.getters.userDataYout.channels))
			if (this.sortTerm == 1)
				channels = channels.sort((a, b) => parseInt(a.subscriberCount) - parseInt(b.subscriberCount))
			if (this.sortTerm == 2)
				channels = channels.sort((a, b) => parseInt(b.subscriberCount) - parseInt(a.subscriberCount))
			if (this.sortTerm == 3 && !this.onlyMy)
				channels = this.$store.getters.getChannels
			if (this.searchTerm)
				channels = channels.filter(a => a.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0)
			if (this.subscribersMoreThen)
				channels = channels.filter(a => parseInt(a.subscriberCount) > this.subscribersMoreThen)
			if (this.viewsMoreThen)
				channels = channels.filter(a => parseInt(a.viewCount) > this.viewsMoreThen)
			return channels
		}
	},
	mounted () {
		window.addEventListener('scroll', this.handleScroll)
	},
  }
</script>