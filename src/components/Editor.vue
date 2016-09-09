<template>
  <div id="editor">
    <input type="text" name="title" placeholder="Title" :value="title" @input="update">
    <div id="raw-editor">
      <textarea :value="content"
                @input='render'>
        
      </textarea>
    </div>
    <div id="render-editor">
      {{{ renderHtml }}}
    </div>
  </div>
</template>

<script> 
  import { getActiveRaws, getTitleNow, getContentNow } from '../vuex/getters'
  import { updateTitle, updateContent } from '../vuex/actions'
  import marked from 'marked';

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: true,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return require('highlight.js').highlightAuto(code).value;
    }
  });

  export default {
    vuex: {
      getters: {
        currentNote: getActiveRaws,
        title: getTitleNow,
        content: getContentNow,
      },
      actions: {
        updateTitle,
        updateContent,
      }
    },
    data() {
      return {
        renderHtml: '',
      }
    },
    methods: {
      render(e) {
        this.updateContent(e.target.value);
        this.renderHtml = marked(e.target.value);
      },
      update(e) {
        this.updateTitle(e.target.value);
      }
    },
    ready() {
      this.renderHtml = marked(this.currentNote.content)
    }
  }
</script>

<style lang="scss" scoped>
  #editor
  {
    height: 100%;
    font-size: 32px;
    margin-left:2em;

    input
    {
      height: 4%;
      width: 100%;
      display: block;
      box-sizing: border-box;
      border: none;
      border-bottom: 2px solid #999;
      outline: none;
      background-color: #ccc;
      padding-left: 0.5em;
      font-size: 20px;
    }

    #raw-editor
    {
      width: 50%;
      height: 96%;
      float: left;

      textarea
      {
        height: 100%;
        width: 100%;
        border: none;
        display: block;
        box-sizing: border-box;
        padding: 1em;
        background-color: #333;
        color: #FFF;
        font-size: 18px;
        outline: none;
        resize: none;
      }
    }

    #render-editor
    {
      width: 50%;
      height: 96%;
      float: left;
      box-sizing: border-box;
      padding: 1em;
      overflow: auto;
    }

  }

  

</style>