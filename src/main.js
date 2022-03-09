import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebaseConfig from './config/firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import store from './store'
import VuetifyConfirm from 'vuetify-confirm'
import InstagramItem from './components/InstagramItem'
import YoutubeItem from './components/YoutubeItem'
import InstagramDetail from './components/InstagramDetail'
import YoutubeDetail from './components/YoutubeDetail'

Vue.config.productionTip = false
Vue.component('instagram-item', InstagramItem);
Vue.component('youtube-item', YoutubeItem);
Vue.component('instagram-detail', InstagramDetail);
Vue.component('youtube-detail', YoutubeDetail);
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
db.settings({
	timestampsInSnapshots: true,
	merge: true 
})


/*Импорт json в firestore
const data = require("./result.json");
Object.keys(data).forEach(key => {
    const nestedContent = data[key];

    if (typeof nestedContent === "object") {
				db
                .collection('channels')
                .doc(key)
                .set(nestedContent)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.log(error);
                });
    }
});*/

Vue.$db = db
Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'ОК',
  buttonFalseText: 'Отмена',
  color: 'dark',
  icon: 'warning',
  title: 'Выход из аккаунта',
  width: 350
})

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
	/*firebase.auth().onAuthStateChanged(function(user) {
		store.dispatch('STATE_CHANGED', user)
	})*/
	
	store.dispatch('LOAD_ACCOUNTS')
	store.dispatch('LOAD_CHANNELS')
  }
}).$mount('#app')
