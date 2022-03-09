<template>
	<v-container grid-list-md>
		<v-layout row wrap>
			<v-flex xs12 sm10 offset-sm1>
				<v-card>
					<v-card-title>
						<div>
							<h3 class="headline mb-0"><v-icon>email</v-icon> {{userEmail}}</h3>
						</div>
					</v-card-title>
					<v-card-actions>
						<v-dialog  v-model="dialog" persistent max-width="400">
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" text color="orange">
									Изменить данные
								</v-btn>
							</template>
							<v-card>
								<v-card-title class="headline">Изменить личные данные?</v-card-title>
								<v-card-text>
									<v-alert :value="isError" type="warning">
										{{getError}}
									</v-alert>
									<v-form v-model="valid" ref="form" validation>
										<v-text-field
											prepend-icon="person"
											name="email"
											label="Текущая почта"
											type="email"
											v-model="email"
											:rules="emailRules"
										></v-text-field>
										<v-text-field
											prepend-icon="lock"
											name="password"
											label="Текущий пароль"				
											v-model="password"
											:rules="passwordRules"
											:append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
											:type="passwordType ? 'text' : 'password'"
											@click:append="passwordType = !passwordType"
										>
										</v-text-field>
									
										<h3>Я хочу изменить:</h3>
										<v-radio-group v-model="changeType">
											<v-radio label="Почту" :value="'email'"></v-radio>
											<v-text-field
												v-if="changeType == 'email'"
												prepend-icon="person"
												name="email"
												label="Новая почта"
												type="text"
												v-model="newemail"
												:rules="emailRules"
											></v-text-field>
											<v-radio label="Пароль" :value="'password'"></v-radio>
											<v-text-field
												v-if="changeType == 'password'"
												prepend-icon="lock"
												name="newpassword"
												label="Новый пароль"				
												v-model="newpassword"
												:rules="passwordRules"
												:append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
												:type="passwordType ? 'text' : 'password'"
												@click:append="passwordType = !passwordType"
											>
											</v-text-field>
										</v-radio-group>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="red" text @click="dialog = false">Отмена</v-btn>
									<v-btn color="green" text :disabled="getProcessing || !valid"
										@click="changeUserData">Изменить</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</v-card-actions>
				</v-card>
				<v-tabs v-model="tabMode" color="accent" dark fixed-tabs slider-color="success">
					<v-tab :key="'accounts'" ripple>
						Аккаунты Instagram
					</v-tab>
					<v-tab :key="'channels'" ripple>
						Каналы YouTube
					</v-tab>
					<v-tab-item :key="'accounts'">
						<Instagram :onlyMy="true"></Instagram>
					</v-tab-item>
					<v-tab-item :key="'channels'">
						<Youtube :onlyMy="true"></Youtube>
					</v-tab-item>
				</v-tabs>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import Instagram from './Instagram'
import Youtube from './Youtube'
  export default {
    name: 'Profile',
    data(){
		return {
			tabMode: 'data',
			dialog: false,
			valid: false,
			email: null,
			password: null,
			newemail: null,
			newpassword: null,
			passwordType: false,
			changeType: 'email',
			emailRules: [
				v => !!v || "Обязательное поле",
				v =>
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"Некорректный адрес почты"
			],
			passwordRules: [
				v => !!v || "Обязательное поле",
				v =>
					(v && v.length >= 6) || "Пароль должен содержать не менее 6 символов"
			]
		}
    },
	computed: {
		...mapGetters(['userEmail', 'getError', 'getProcessing']),
		isError() {
			return this.getError ? true: false
		},
	},
	components: {
		Instagram,
		Youtube
	},
	methods: {
		changeUserData() {
			this.$store.dispatch('CHANGE_USER_PROFILE_DATA', {
				email: this.email,
				password: this.password,
				newemail: this.newemail,
				newpassword: this.newpassword,
				changeType: this.changeType
			})
			this.dialog = false,
			this.email = null,
			this.password = null,
			this.newemail = null,
			this.newpassword = null
		}
	}
  }
</script>
