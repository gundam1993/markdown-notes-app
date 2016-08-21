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

function makeAction(type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args);
};

const initRaw = {
  id: +new Date(),
  title: 'My Note',
  content:'# My first note',
  favorite: false,
};

const initData = {
  show: 'all',
  raws: [initRaw],
  activeRaw: initRaw,
  showModal: false,
};

export const initStore = ({ dispatch }) => {
  dispatch('INIT_STORE', initData);
};

export const updateActiveRaw = makeAction('SET_ACTIVE_RAW');

export const newRaw = makeAction('NEW_RAW');

export const deleteRaw = makeAction('DELETE_RAW');

export const toggleFavorite = makeAction('TOGGLE_FAVORITE');

export const editRaw = makeAction('EDIT_RAW');

export const abandonEdit = makeAction('ABANDON_EDIT');

export const updateTitle = makeAction('UPDATE_TITLE');

export const updateContent = makeAction('UPDATE_CONTENT');

export const updateShow = makeAction('SET_SHOW_ALL');

export const renderHtml = makeAction('RENDER_HTML');

export const toggleModal = makeAction('TOGGLE_MODAL');
