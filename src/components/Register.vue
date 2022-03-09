<template>
	<v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark>
						<v-toolbar-title>Регистрация</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
						<v-alert :value="error" type="warning">
							{{error}}
						</v-alert>
                        <v-form v-model="valid" ref="form" validation>
                            <v-text-field
								prepend-icon="person"
								name="email"
								label="Почта"
								type="email"
								v-model="email"
								:rules="emailRules"
							></v-text-field>
							<v-text-field
								prepend-icon="lock"
								name="password"
								label="Пароль"
								v-model="password"
								@keyup.enter="onSubmit"
								:rules="passwordRules"
								:append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
								:type="passwordType ? 'text' : 'password'"
								@click:append="passwordType = !passwordType"
							></v-text-field>
							<v-text-field
								prepend-icon="lock"
								name="confirmPassword"
								label="Подтвердить пароль"
								v-model="confirmPassword"
								@keyup.enter="onSubmit"
								:rules="confirmPasswordRules"
								:append-icon="passwordType ? 'mdi-eye' : 'mdi-eye-off'"
								:type="passwordType ? 'text' : 'password'"
								@click:append="passwordType = !passwordType"
							></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
						<v-spacer></v-spacer>
                        <v-btn dark @click="onSubmit" :disabled="processing">Отправить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Register',
    data() {
		return {
			valid: false,
			email: null,
			password: null,
			confirmPassword: null,
			passwordType: false,
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
			],
			confirmPasswordRules: [
				v => !!v || "Обязательное поле",
				v => v === this.password || "Пароли должны совпадать"
			]
		}
    },
	computed: {
		error() {
			return this.$store.getters.getError
		},
		processing() {
			return this.$store.getters.getProcessing
		},
		isUserAuthenticated() {
			return this.$store.getters.isUserAuthenticated
		}
	},
	watch: {
		isUserAuthenticated(val) {
			if (val == true) this.$router.push("/")
		}
	},
	methods: {
		onSubmit() {
			if (this.$refs.form.validate()) {
				this.$store.dispatch('REGISTER', {email: this.email, password: this.password})
			}
			
		}
    }
}
</script>
