<template>
  <div id="toolbar">
    <div class="toolbar-index"
         v-show="$route.path == '/Index'"
         transition="my-transition">
      <i class="iconfont icon-edit"
         v-link="'/Editor'"></i>
      <i class="iconfont icon-noteadd"
         @click="this.newRaw()"
         v-link="'/Editor'"></i>
      <i class="iconfont icon-star"
         :class="{starred: getActiveRaws.favorite}"
         @click="this.toggleFavorite()"></i>
      <i class="iconfont icon-delete"
         @click="deleteBtn()"></i>
    </div>

    <div class="toolbar-editor"
         v-show="$route.path == '/Editor'"
         transition="my-transition">
      <i class="iconfont icon-save"
         @click="editBtn()"></i>
      <i class="iconfont icon-arrowback"
         @click="abandonBtn()"></i>
    </div>
  </div>

  <modal 
   v-if="getModalState"
   :hint="msg"></modal>
</template>

<script>
  import Modal from './modal.vue'
  import { getActiveRaws, getTitleNow, getModalState } from '../vuex/getters'
  import { newRaw, toggleFavorite, toggleModal } from '../vuex/actions'

  export default {
    components:{
      Modal,
    },
    data() {
      return {
        msg: ""
      }
    },
    vuex: {
      getters: {
        getActiveRaws,
        getTitleNow,
        getModalState,
      },
      actions: {
        newRaw,
        toggleFavorite,
        toggleModal,
      },
    },
    methods: {
      editBtn() {
        if (this.getTitleNow === "") {
          this.msg = 'Please Enter Title!';
          this.toggleModal();
        }else{
          this.msg = 'Want to save?';
          this.toggleModal();
        }
      },
      deleteBtn() {
        this.msg = 'Want to delete?';
        this.toggleModal();
      },
      abandonBtn() {
        this.msg = 'Leave without save?';
        this.toggleModal();
      }
    }
  }
</script>

<style lang="scss" scoped>
  html,body
  {
    height: 100%;
    width: 100%;
    #toolbar
    {
      position: fixed;
      font-size: 32px;
      top: 0;
      left: 0;
      height: 100%;
      width: 2em;
      background-color: #444;
      color: #767676;
      padding: 1em 0.3em;
      box-sizing: border-box;
      z-index: 1;

      
      i
      {
        margin: 0.25em 0;
        cursor: pointer;
        display: block;
      }
    }
  }

  @font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_1471148637_636605.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1471148637_636605.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'), /* chrome,firefox */
    url('//at.alicdn.com/t/font_1471148637_636605.ttf') format('truetype'), /* chrome,firefox,opera,Safari, Android, iOS 4.2+*/
    url('//at.alicdn.com/t/font_1471148637_636605.svg#iconfont') format('svg'); /* iOS 4.1- */
    src: url('//at.alicdn.com/t/font_1471148637_636605.eot')\0; /* ie8 fix */
  }

  .iconfont 
  {
    font-family:"iconfont" !important;
    font-size:32px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    transition: color 0.2s ease-in-out;
  }

  .icon-arrowback:before { content: "\e604"; }
  .icon-delete:before { content: "\e600"; }
  .icon-edit:before { content: "\e601"; }
  .icon-home:before { content: "\e605"; }
  .icon-noteadd:before { content: "\e602"; }
  .icon-save:before { content: "\e606"; }
  .icon-star:before { content: "\e603"; }

  .icon-edit:hover
  {
    color: #58B2DC;
  }
  .icon-noteadd:hover
  {
    color: #5DAC81;
  }
  .icon-star:hover
  {
    color: #F7D94C;
  }
  .starred
  {
    color: #F7AE4F;
  }
  .icon-delete:hover
  {
    color: #E83015;
  }
  .icon-save:hover
  {
    color: #58B2DC;
  }
  .icon-arrowback:hover
  {
    color: #E83015;
  }

  .my-transition-transition {
  transition: all .5s ease;
}

/* .expand-enter 定义进入的开始状态 */
/* .expand-leave 定义离开的结束状态 */
.my-transition-enter, .my-transition-leave {
  height: 0;
  padding: 0 10px;
  margin-top: -8px;
  opacity: 0;
}
</style>
