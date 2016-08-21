import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 需要维护的状态
const state = {
  raws: [],
  activeRaw: {},
  show: '',
  titleNow: '',
  contentNow: '',
  showModal: false,
};

const mutations = {
  // 初始化 state
  INIT_STORE(state, data) {
    if (window.localStorage.markdownNotes) {
      const localdata = JSON.parse(window.localStorage.markdownNotes);
      state.raws = localdata.raws;
      state.show = localdata.show;
      state.activeRaw = localdata.activeRaw;
    }else{
    const newdata = JSON.stringify(data);
      window.localStorage.markdownNotes = newdata;
      state.raws = data.raws;
      state.show = data.show;
      state.activeRaw = data.activeRaw;
    }
    state.titleNow = state.activeRaw.title;
    state.contentNow = state.activeRaw.content;
  },
  // 新增笔记
  NEW_RAW(state) {
    var newRaw = {
      id: +new Date(),
      title: '',
      content:'',
      favorite: false,
    };
    state.raws.push(newRaw);
    state.activeRaw = newRaw;
    state.titleNow = state.activeRaw.title;
    state.contentNow = state.activeRaw.content;
    window.localStorage.markdownNotes = JSON.stringify(state);
  },
  //同步标题
  UPDATE_TITLE(state, title) {
    state.titleNow = title;
  },
  //同步内容
  UPDATE_CONTENT(state, content) {
    state.contentNow = content;
  },
  // 修改笔记
  EDIT_RAW(state) {
    state.activeRaw.title = state.titleNow;
    state.activeRaw.content = state.contentNow;
    // 修改原始数据
    for (var i = 0; i < state.raws.length; i++) {
       if (state.raws[i].id === state.activeRaw.id) {
        state.raws[i] = state.activeRaw;
        break;
       }
     }
     window.localStorage.markdownNotes = JSON.stringify(state);
  },
  //  放弃修改
  ABANDON_EDIT(state) {
    // 还原原始数据
    state.titleNow = state.activeRaw.title;
    state.contentNow = state.activeRaw.content;
    for (var i = 0; i < state.raws.length; i++) {
      if (state.raws[i].title === '' && state.raws[i].content === '') {
        state.raws.$remove(state.raws[i]);
      }
    }
    window.localStorage.markdownNotes = JSON.stringify(state);
  },
  // 删除笔记
  DELETE_RAW(state) {
    state.raws.$remove(state.activeRaw);
    state.activeRaw = state.raws[0] || {};
    state.titleNow = state.activeRaw.title;
    state.contentNow = state.activeRaw.content;
    window.localStorage.markdownNotes = JSON.stringify(state);
  },
  // 切换笔记的收藏与取消
  TOGGLE_FAVORITE(state) {
    state.activeRaw.favorite = !state.activeRaw.favorite;
    window.localStorage.markdownNotes = JSON.stringify(state);
  },
  // 切换显示数据的类型 全部/收藏
  SET_SHOW_ALL(state, show) {
    state.show = show;
    // 切换数据展示，需要同步更新 activeRaw
    if (show === 'favorite') {
      state.activeRaw = state.raws.filter(raw => raw.favorite)[0] || {};
    }else{
      state.activeRaw = state.raws[0] || {}; 
    }
  },
  SET_ACTIVE_RAW(state, raw) {
    state.activeRaw = raw;
    state.titleNow = state.activeRaw.title;
    state.contentNow = state.activeRaw.content;
  },
  //弹出modal
  TOGGLE_MODAL(state) {
    state.showModal = !state.showModal;
  },
};

export default new Vuex.Store({
  state,
  mutations,
});