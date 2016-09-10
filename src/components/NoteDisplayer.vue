<template>
  <div id="note-displayer">
    {{{ mark(getActiveRaws.content) }}}
  </div>
</template>

<script>
  import { getActiveRaws } from '../vuex/getters';
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
        getActiveRaws,
      },
    },
    methods: {
      mark(text) {
        return marked(text);
      }
    }
  }
</script>

<style>
   #note-displayer
  {
    width: 73%;
    min-width: 720px;
    padding: 1em 2.5em;
    box-sizing: border-box;
    float: left;
    margin-left: 410px;  
  }

</style>