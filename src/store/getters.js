const book = {
  fileName: state => state.book.fileName,
  titleAndMenuVisible: state => state.book.titleAndMenuVisible,
  menuSettingVisible: state => state.book.menuSettingVisible,
  defaultFontSize: state => state.book.defaultFontSize,
  currentBook: state => state.book.currentBook,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisible: state => state.book.fontFamilyVisible,
  defaultTheme: state => state.book.defaultTheme,
  progress: state => state.book.progress,
  bookAvailable: state => state.book.bookAvailable,
  section: state => state.book.section,
  cover: state => state.book.cover,
  metadata: state => state.book.metadata,
  navigation: state => state.book.navigation,
  offsetY: state => state.book.offsetY,
  isBookmark: state => state.book.isBookmark,
  bookmarks: state => state.book.bookmarks,
  totPage: state => state.book.totPage,
  paginate: state => state.book.paginate,
  hotSearchPageOffsetY: state => state.store.hotSearchPageOffsetY,
  flapCardVisible: state => state.store.flapCardVisible,
  isEditModel: state => state.store.isEditModel,
  shelfList: state => state.store.shelfList,
  shelfSelected: state => state.store.shelfSelected,
  shelfTitleVisible: state => state.store.shelfTitleVisible,
  currentType: state => state.store.currentType,
  shelfGroup: state => state.store.shelfGroup,
  searchShelfList: state => state.store.searchShelfList
}

export default book
