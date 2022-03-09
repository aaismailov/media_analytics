<template>
	<v-card max-width="950" class="white--text" color="#404040">
		<v-container fluid>
			<v-layout class="hidden-sm-and-down" row style="margin-top: -20px" >
				<v-col md6>
					<v-flex  col="1">
						<v-card-title>
							<div>
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_private">mdi-lock</v-icon>
									</template>
									<span>Закрытый профиль</span>
								</v-tooltip>
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_verified">verified</v-icon>
									</template>
									<span>Подтверженный профиль</span>
								</v-tooltip>
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_business">work</v-icon>
									</template>
									<span>Бизнес-аккаунт</span>
								</v-tooltip>
								<div class="headline">Никнейм: {{account.username}}
									<v-btn icon dark :href="'https://www.instagram.com/'+account.username" target="_blank">
										<v-icon>mdi-open-in-new</v-icon>
									</v-btn>
								</div>
								<div v-if="account.full_name">Имя: {{account.full_name}}</div>
								<div v-if="account.external_url">
									Сайт: <a target="_blank" :href=account.external_url>{{account.external_url}}</a>
								</div>
							</div>
						</v-card-title>
					</v-flex>
				</v-col>
				<v-col md4 cols="4">
					<v-card-title>
						<div style="padding: 10px; border-width:1; border-color: grey; border-style: solid; background:grey; border-radius: 10px;">
							<div>Подписчиков: {{account.follower_count}}</div>
							<div>Подписок: {{account.following_count}}</div>
							<div>Постов: {{account.media_count}}</div>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn icon @click="show = !show" dark>
							<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
						</v-btn>
					</v-card-actions>
				</v-col>
			</v-layout>
			<v-layout class="hidden-md-and-up" row style="margin-top: -20px; margin-bottom: -20px" >
				<v-flex xs12>
					<v-card-title>
						<div>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_private">mdi-lock</v-icon>
								</template>
								<span>Закрытый профиль</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_verified">verified</v-icon>
								</template>
								<span>Подтверженный профиль</span>
							</v-tooltip>
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-icon dark v-bind="attrs" v-on="on" v-if="account.is_business">work</v-icon>
								</template>
								<span>Бизнес-аккаунт</span>
							</v-tooltip>
							<div class="headline">Никнейм: {{account.username}}
								<v-btn icon dark :href="'https://www.instagram.com/'+account.username" target="_blank">
									<v-icon>mdi-open-in-new</v-icon>
								</v-btn>
							</div>
							<div v-if="account.full_name">Имя: {{account.full_name}}</div>
							<div v-if="account.external_url">
								Сайт: <a target="_blank" :href=account.external_url>{{account.external_url}}</a>
							</div>
						</div>
					</v-card-title>
				</v-flex>
				<v-flex xs8>
					<v-card-title>
						<div style="padding: 10px; border-width:1; border-color: grey; border-style: solid; background:grey; border-radius: 10px;">
							<div>Подписчиков: {{account.follower_count}}</div>
							<div>Подписок: {{account.following_count}}</div>
							<div>Постов: {{account.media_count}}</div>
						</div>
					</v-card-title></v-flex><v-flex>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn icon @click="show = !show" dark>
							<v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
						</v-btn>
					</v-card-actions>
				</v-flex>
			</v-layout>
			<v-slide-y-transition>
				<div v-show="show">
					<v-divider></v-divider>
					<instagram-detail :onlyMy="onlyMy" :pk="account.pk"></instagram-detail>
				</div>
			</v-slide-y-transition>
		</v-container>
	</v-card>
</template>

<script>
import InstagramDetail from './InstagramDetail'
  export default {
    name: 'InstagramItem',

	data() {
		return {
			show: false,
		}
	},
    props: {
		"account": {
			type: Object,
			required: true
		},
		"onlyMy": {
			type: Boolean,
			default: false
		}
	},
	components: {
		InstagramDetail
	}
  }
</script>
