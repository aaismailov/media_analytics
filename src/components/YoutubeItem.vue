<template>
	<v-card max-width="950" class="white--text" color="#404040">
		<v-container fluid>
			<v-layout class="hidden-sm-and-down" row style="margin-top: -20px" >
				<v-col md6>
					<v-flex  col="1">
						<v-card-title>
							<div class="headline">Никнейм: {{channel.title}}
							</div>
						</v-card-title>
					</v-flex>
				</v-col>
				<v-col md4 cols="4">
					<v-card-title>
						<div style="padding: 10px; border-width:1; border-color: grey; border-style: solid; background:grey; border-radius: 10px;">
							<div>Подписчиков: {{channel.subscriberCount}}</div>
							<div>Просмотров: {{channel.viewCount}}</div>
							<div>Видео: {{channel.videoCount}}</div>
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
							<div class="headline">Никнейм: {{channel.title}}
							</div>
						</v-card-title>
				</v-flex>
				<v-flex xs8>
					<v-card-title>
						<div style="padding: 10px; border-width:1; border-color: grey; border-style: solid; background:grey; border-radius: 10px;">
							<div>Подписчиков: {{channel.subscriberCount}}</div>
							<div>Просмотров: {{channel.viewCount}}</div>
							<div>Видео: {{channel.videoCount}}</div>
						</div>
					</v-card-title>
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
					<youtube-detail :onlyMy="onlyMy" :id="channel.id"></youtube-detail>
				</div>
			</v-slide-y-transition>
		</v-container>
	</v-card>
</template>

<script>
import YoutubeDetail from './YoutubeDetail'
  export default {
    name: 'YoutubeItem',

	data() {
		return {
			show: false,
		}
	},
    props: {
		"channel": {
			type: Object,
			required: true
		},
		"onlyMy": {
			type: Boolean,
			default: false
		}
	},
	components: {
		YoutubeDetail
	}
  }
</script>
