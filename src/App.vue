<template>
  <div id="app">
    <toolbar></toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Toolbar from './components/Toolbar';
  import NotesList from './components/NotesList';
  import Editor from './components/Editor';
  import store from './vuex/store';
  import { initStore } from './vuex/actions';


  export default {
    components: {
      Toolbar,
    },
    store,
    vuex: {
      actions: {
        initStore,
      },
    },
    ready() {
      this.initStore();
    },
  }
</script>

<style>
  html,#app
  {
    height: 100%;
  }

  body
  {
    margin: 0;
    padding: 0;
    border: 0;
    height: 100%;
    max-height: 100%;
    min-width: 1280px;
    position: relative;
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  pre,code 
  {
    font-family: Menlo, Monaco, "Courier New", monospace;
  }
  pre
  {
    background-color: #eee;
    padding: 0.5rem;
    border-radius: 5px;
  }

  h1,
.retro-h1 {
  margin-top: 0;
  font-size: 2.5rem;
}

h2,
.retro-h2 {
  font-size: 1.8rem;
}

h3,
.retro-h3 {
  font-size: 1.3rem;
}

h4,
.retro-h4 {
  font-size: 1rem;
}

h5,
.retro-h5 {
  font-size: .88rem;
}

h6,
.retro-h6 {
  font-size: .5rem;
}

table
{
  border: 1px solid #000;
  border-collapse: collapse;
}

th
{
  border: 1px solid #000;
}

td
{
  border: 1px solid #000;
}

</style>
