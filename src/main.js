import Vue from 'vue';
import App from './App';
import NotesList from './components/NotesList.vue';
import NoteDisplayer from './components/NoteDisplayer.vue';
import Editor from './components/Editor.vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);
const router = new VueRouter();

router.map({
  '/Index': {
    component: NotesList,
  },
  '/Editor': {
    component: Editor,
  }
});

router.redirect({
  '*': 'Index'
});

router.start(App, '#app');