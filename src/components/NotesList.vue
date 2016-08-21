<template>
  <div id="notes-list">
    <div id="list">
      <div id="list-header">
        <h2>Markdown Notes</h2>
        <div class="list-search-block">
          <input type="text" placeholder="Search for..." v-model="search">
        </div>
        <div class="list-header-btn"
             :class="{chosen:getShow == 'all'}"
             @click="this.updateShow('all')">All Notes</div>
        <div class="list-header-btn"
             :class="{chosen:getShow == 'favorite'}"
             @click="this.updateShow('favorite')">Favorite</div>
      </div>
      <div class="container">
        <div class="list-group">
          <a v-for="raw in filteredRaws | filterBy search"
             class="list-group-item" href="#"
             :class="{active: getActiveRaws === raw}"
             @click="updateActiveRaw(raw)">
            <h4 v-if="raw.title.trim()>20">
              {{raw.title.trim().substring(0,20) + '…'}}
            </h4>
            <h4 v-else>
              {{raw.title.trim()}}
            </h4>
          </a>
        </div>
      </div>
    </div>

    <note-displayer></note-displayer>
  </div>
</template>

<script>
  import NoteDisplayer from './NoteDisplayer.vue';
  import { filteredRaws, getShow, getActiveRaws } from '../vuex/getters';
  import { updateActiveRaw, updateShow } from '../vuex/actions';

  export default {
    vuex: {
      getters: {
        filteredRaws,
        getShow,
        getActiveRaws,
      },
      actions: {
        updateActiveRaw,
        updateShow,
      },
    },
    data() {
      return {
        search: ""
      }
    },
    components: {
      NoteDisplayer,
    },
    methods: {
      toggleShow(show) {
        this.updateShow(show);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #notes-list
  {
    height: 100%;
    width: 100%;
    float: left;
  }
  #list
  {
    width: 18%;
    min-width: 345px;
    height: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 58px;
    background-color: #EEE;
    text-align: center;
    z-index: 1;

    #list-header
    {
      overflow: auto;

      .list-search-block
      {
        width: 100%;
        margin-bottom: 10px;

        input
        {
          outline: none;
          width: 60%;
          height: 1.5em;
          font-size: 16px;
          border: 2px solid #999;
          padding: 0 5px;
        }
      }
    }
    
    h2
    {
      margin: 0;
      display: block;
      line-height: 1.7em;
    }

    .list-header-btn
    {
      width: 50%;
      height: 50px;
      line-height: 50px;
      float: left;
      font-weight: bolder;
      cursor: pointer;

      &:hover
      {
        background-color: #aaa;
      }
    }
    .chosen
      {
        background-color: #ccc;
      }
  }

   .container{
      overflow: auto;
      width: 100%;
      height: calc(100% - 50px);
      padding: 0;
      background-color: #ccc;

      .active{
        background-color: #bbb;
      }

      .favorite{
        background-color: #FBE251;
      }

      .list-group-item{
        border: 0;
        display: block;
        text-decoration: none;
        color: #000;
        padding: 10px 0 10px 10px;
        text-align: left;

        &:hover
        {
          background-color: #999;
          color: #000;
        }

        h4{
          margin: 0;
        }
      }
    }
</style>