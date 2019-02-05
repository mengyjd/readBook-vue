const store = {
  state: {
    hotSearchPageOffsetY: 0,
    flapCardVisible: false,
    isEditModel: false,
    shelfList: [], // 书架图书列表
    shelfSelected: [], // 书架选中的图书列表
    shelfTitleVisible: true,
    isPrivate: true,
    isCache: true
  },
  mutations: {
    'SET_PRIVATE': (state, isPrivate) => {
      state.isPrivate = isPrivate
    },
    'SET_CACHE': (state, isCache) => {
      state.isCache = isCache
    },
    'SET_HOT_SEARCH_PAGE_OFFSETY': (state, hotSearchPageOffsetY) => {
      state.hotSearchPageOffsetY = hotSearchPageOffsetY
    },
    'SET_FLAP_CARD_VISIBLE': (state, flapCardVisible) => {
      state.flapCardVisible = flapCardVisible
    },
    'SET_IS_EDIT_MODEL': (state, isEditModel) => {
      state.isEditModel = isEditModel
    },
    'SET_SHELF_LIST': (state, shelfList) => {
      state.shelfList = shelfList
    },
    'SET_SHELF_SELECTED': (state, shelfSelected) => {
      state.shelfSelected = shelfSelected
    },
    'SET_SHELF_TITLE_VISIBLE': (state, shelfTitleVisible) => {
      state.shelfTitleVisible = shelfTitleVisible
    }
  }
}

export default store
