// 获取 rawList,这里将会根据state.show 的状态做数据过滤
export const filteredRaws = (state) => {
  if(state.show === 'all') {
    return state.raws || {};
  }else if(state.show === 'favorite'){
    return state.raws.filter(raw => raw.favorite) || {};
  }
};

// 获取列表展示状态 ： all or favoriteMaterial Theme
export const getShow = (state) => {
  return state.show;
};

// 获取当前激活raw
export const getActiveRaws = (state) => {
  return state.activeRaw;
};

export const getTitleNow = (state) => {
  return state.titleNow;
};

export const getContentNow = (state) => {
  return state.contentNow;
};

export const getModalState = (state) => {
  return state.showModal;
};