<template>
	<v-container>
		<section>
			<v-row class="text-center">
				<v-col cols="12">
					<v-img
						:src="require('../assets/google-analytics.png')"
						class="my-3"
						contain
						height="200"
					/>
				</v-col>

				<v-col class="mb-4">
					<h1 class="display-2 font-weight-bold mb-3">
						Добро пожаловать в Media analytics
					</h1>
				</v-col>
			</v-row>
		</section>
		<section style="margin-top: 50px">
			<v-row class="text-center">
				<v-container grid-list-xl>
					<v-layout row wrap align-center>
						<v-flex xs12 md4>
							<v-card	class="elevation-0 transparent">
								<v-card-text class="text-xs-center">
									<v-icon x-large class="orange--text text--lighten-1">qr_code_scanner</v-icon>
								</v-card-text>
								<v-card-title primary-title class="layout justify-center">
									<div class="headline text-xs-center">Просматривай аккаунты</div>
								</v-card-title>
								<v-card-text class="layout justify-center">
									Просматривай instagram-аккаунты и youtube-каналы, ищи нужных тебе инфлюенсеров, используя фильтры и сортировки, а также узнавай информацию о пользователе тут же на сервисе!
								</v-card-text>
							</v-card>
						</v-flex>
						<v-flex xs12 md4>
							<v-card	class="elevation-0 transparent">
								<v-card-text class="text-xs-center">
									<v-icon x-large class="orange--text text--lighten-1">save_alt</v-icon>
								</v-card-text>
								<v-card-title primary-title class="layout justify-center">
									<div class="headline text-xs-center">Подобрали инфлюенсера?</div>
								</v-card-title>
								<v-card-text class="layout justify-center">
									Зарегистрируйтесь на сервисе и вы сможете сохранить аккаунт/канал себе в личный кабинет и составить таким образом личную базу данных из инфлюенсеров
								</v-card-text>
							</v-card>
						</v-flex>
						<v-flex xs12 md4>
							<v-card	class="elevation-0 transparent">
								<v-card-text class="text-xs-center">
									<v-icon x-large class="orange--text text--lighten-1">devices</v-icon>
								</v-card-text>
								<v-card-title primary-title class="layout justify-center">
									<div class="headline text-xs-center">Находи на любом устройстве</div>
								</v-card-title>
								<v-card-text class="layout justify-center">
									Веб-сервис оптимизирован для работы на любом устройстве: можно заниматься поиском инфлюенсеров со стационарного компьютера, смартфона, а также планшета
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-row>
		</section>
		<section  style="margin-top: 50px; margin-bottom: 50px">
			<v-row class="text-center">
				<v-container grid-list-xl>
					<v-layout row wrap justify-center>
						<v-flex xs12 sm6>
							<v-card	class="elevation-0 transparent">
								<v-card-title primary-title class="layout justify-center">
									<div class="headline text-xs-center">О проекте</div>
								</v-card-title>
								<v-card-text class="layout">
									<div>
										<div>
											Данный Web-сервис был разработан с целью подбора релевантных лидеров мнений для продвижения продуктов на рынке.
										</div>
										<div>
											Больше информации: <a target="_blank" href="https://cabinet.miem.hse.ru/#/project/542/">кабинет проекта</a>
										</div>
									</div>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-row>
		</section>
	</v-container>
</template>

<script>
export default {
    name: 'Home',

    data: () => ({
	//
    }),
}
</script>
