<template>
<v-app>
	<v-navigation-drawer fixed app temporary v-model="drawer" class="hidden-md-and-up">
		<v-list>
			<v-list-item v-for="(item,i) in apiItems" :key="`navapi${i}`" :to="item.route">
				<v-list-item-action>
					<v-icon v-html="item.icon"></v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>	
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-for="(item,i) in menuItems" :key="`navmenu${i}`" :to="item.route">
				<v-list-item-action>
					<v-icon v-html="item.icon"></v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title v-text="item.title"></v-list-item-title>	
				</v-list-item-content>
			</v-list-item>
			<v-list-item @click.prevent="signout" v-if="isUserAuthenticated">
				<v-list-item-action>
					<v-icon left>exit_to_app</v-icon>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>Выйти</v-list-item-title>	
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
    <v-app-bar app dark>
		<v-app-bar-nav-icon @click.stop="drawer = !drawer"  class="hidden-md-and-up"></v-app-bar-nav-icon>
		<router-link style="text-decoration: none; color: inherit;" class="nav-link" to="/">
			<div class="d-flex align-center">
				<v-icon color="orange">mdi-google-analytics</v-icon>
				<h2>MEDIA ANALYTICS</h2>
			</div>
		</router-link>
		
		<v-toolbar-items style="margin-left: 25px" class="hidden-sm-and-down">
			<v-btn text v-for="(item, i) in apiItems" :key="`apiitem${i}`" :to="item.route">
				<v-icon left v-html="item.icon"></v-icon>
				{{item.title}}
			</v-btn>
		</v-toolbar-items>
		
		<v-spacer></v-spacer>
		
		<v-btn icon @click="toggle_dark_mode" class="hidden-sm-and-down">
			<v-icon>mdi-theme-light-dark</v-icon>
		</v-btn>
		
		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn text v-for="(item, i) in menuItems" :key="`menuitem${i}`" :to="item.route">
				<v-icon left v-html="item.icon"></v-icon>
				{{item.title}}
			</v-btn>
			<v-btn text @click.prevent="signout" v-if="isUserAuthenticated">
				<v-icon left>exit_to_app</v-icon>
				Выйти
			</v-btn>
		</v-toolbar-items>
    </v-app-bar>
	<v-main>
		<transition name="view">
			<router-view/>
		</transition>
	</v-main>
	
  </v-app>
</template>

<script>

export default {
	name: 'App',
	data(){
		return {
			drawer: false
		};
	},
	methods: {
		toggle_dark_mode: function() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
		},
		signout() {
			this.$confirm('Вы действительно хотите выйти?').then(res => {
				if (res) this.$store.dispatch('SIGNOUT')
				this.$router.push("/")
			})
		}
	},
	computed: {
		isUserAuthenticated() {
			return this.$store.getters.isUserAuthenticated
		},
		apiItems() {
			return [
				{
					icon: 'mdi-instagram',
					title: 'Instagram',
					route: '/instagram',
				},
				{
					icon: 'mdi-youtube',
					title: 'Youtube',
					route: '/youtube',
				},
			]
		},
		menuItems() {
			return this.isUserAuthenticated ? [
				{
					icon: 'account_circle',
					title: 'Мой кабинет',
					route: '/profile',
				},
			] :
			[
				{
					icon: 'input',
					title: 'Войти',
					route: '/login',
				},
				{
					icon: 'lock',
					title: 'Зарегистрироваться',
					route: '/register',
				},
			]
		}
	},
	mounted() {
		const theme = localStorage.getItem("dark_theme");
		if (theme) {
			if (theme === "true") {
				this.$vuetify.theme.dark = true;
			} else {
				this.$vuetify.theme.dark = false;
			}
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			this.$vuetify.theme.dark = true;
			localStorage.setItem(
				"dark_theme",
				this.$vuetify.theme.dark.toString()
			);
		}
	}
};
</script>

<style scoped>
.view-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.view-enter-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease;
    transition-delay: 0.5s;
}

.view-enter, .view-leave-to {
    opacity: 0;
}

.view-enter-to, .view-leave {
    opacity: 1;
}

</style>