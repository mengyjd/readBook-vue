import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, getReadTimeByMinute } from './book'
import {
  getBookmark,
  getBookShelf,
  removeLocalStorage,
  saveBookShelf,
  saveLocation
} from './localStorage'
import { addShelfList, categoryName, getTranslateCategoryText, gotoDetail, gotoList } from './store'
import { shelf } from '../api/store'
import { removeLocalForage } from './localforage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'currentBook',
      'titleAndMenuVisible',
      'menuSettingVisible',
      'fontFamilyVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'defaultTheme',
      'progress',
      'bookAvailable',
      'section',
      'cover',
      'metadata',
      'navigation',
      'offsetY',
      'isBookmark',
      'bookmarks',
      'totPage',
      'paginate'
    ]),
    themeList () {
      return themeList(this)
    },
    getSectionName () {
      return this.section ? this.navigation[this.section].label : ''
    }
  },
  methods: {
    ...mapActions([
      'setTitleAndMenuVisible',
      'setFileName',
      'setMenuSettingVisible',
      'setDefaultFontSize',
      'setCurrentBook',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setProgress',
      'setBookAvailable',
      'setSection',
      'setCover',
      'setMetadata',
      'setNavigation',
      'setOffsetY',
      'setIsBookmark',
      'setBookmarks',
      'setTotPage',
      'setPaginate'
    ]),
    initGlobalStyle (theme) {
      addCss(`${process.env.VUE_APP_RES_URL}/themes/${theme.toLowerCase()}_theme.css`)
    },
    refersLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi) * 100
        this.setProgress(Math.floor(progress))
        saveLocation(this.fileName, startCfi)
        this.setSection(currentLocation.start.index)
        const bookmark = getBookmark(this.fileName)
        if (bookmark) {
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }

        const currentPage = currentLocation.start.location
        if (currentPage && currentPage > 0) {
          this.setPaginate(`${currentPage} / ${this.totPage}`)
        }
      }
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refersLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refersLocation()
          if (cb) cb()
        })
      }
    },
    // 翻页时隐藏标题栏和菜单栏
    hideTitleAndMenu () {
      this.setTitleAndMenuVisible(false) // 隐藏标题栏和菜单栏
      this.setMenuSettingVisible(-1) // 隐藏设置项
      this.setFontFamilyVisible(false) // 隐藏字体设置界面
    },
    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}

export const storeHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchPageOffsetY',
      'flapCardVisible'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchPageOffsetY',
      'setFlapCardVisible'
    ]),
    getTranslateCategoryTextFromId (id) {
      return getTranslateCategoryText(categoryName[id], this)
    },
    showBookDetail(item) {
      gotoDetail(item, this)
    },
    searchBook(text) {
      // 跳转到搜索结果页
      gotoList(this, {
        type: 'keywords',
        value: text
      })
    }
  }
}

export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditModel',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'currentType',
      'shelfGroup'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditModel',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setCurrentType',
      'setShelfGroup'
    ]),
    // 获取书架页面数据
    getShelfList () {
      let shelfList = getBookShelf()
      if (!shelfList) {
        // 如果本地没有缓存则从网络请求
        shelf().then(res => {
          if (res.status === 200 && res.data && res.data.bookList) {
            shelfList = addShelfList(res.data.bookList)
            saveBookShelf(shelfList)
          }
        })
      }
      return this.setShelfList(shelfList)
    },
    // 获取分组页面的数据
    getShelfGroupList (title) {
      this.getShelfList().then(() => {
        const shelfGroup = this.shelfList.filter(book => {
          return book.type === 2 && book.title === title
        })[0]
        this.setShelfGroup(shelfGroup)
      })
    },
    // 将图书移出分组
    moveOutGroup (cb) {
      // 将选中的图书从当前分组中删除
      const shelfList = this.shelfList.map(item => {
        if (item.type === 2 && item.itemList) {
          item.itemList = item.itemList.filter(book => !book.selected)
        }
        return item
      })
      this.setShelfList(shelfList).then(() => {
        if (cb) cb()
      })
    },
    // 添加书籍到书架
    addBooksToShelfList (books, shelfList, cb) {
      shelfList = this.removeShelfItemAdd(shelfList)
      shelfList = shelfList.concat(books)
      shelfList = this.appendShelfItemAdd(shelfList)
      this.setShelfList(shelfList).then(() => {
        saveBookShelf(this.shelfList)
        if (cb) cb()
      })
    },
    // 删除书架中的添加按钮
    removeShelfItemAdd (list) {
      return list.filter(item => item.type !== 3)
    },
    // 为书架增加添加按钮
    appendShelfItemAdd (list) {
      list.push({
        id: -1,
        type: 3
      })
      return list
    },
    initShelfState () {
      this.setIsEditModel(false)
      this.clearSelectedBooks()
      saveBookShelf(this.shelfList)
    },
    clearSelectedBooks () {
      this.shelfSelected.forEach(book => {
        book.selected = false
      })
      this.setShelfSelected([]) // 将vuex中选择的book数组置空
    },
    // 将选中的书籍移出书架
    removeSelectedBook (selectedBooks, cb) {
      let shelfList
      selectedBooks.forEach(selectBook => {
        removeLocalStorage(`${selectBook.categoryText}/${selectBook.fileName}-info`)
        shelfList = this.shelfList.filter(shelfBook => {
          if (shelfBook.itemList) {
            shelfBook.itemList = shelfBook.itemList.filter(subBook => selectBook.fileName !== subBook.fileName)
          }
          return selectBook.fileName !== shelfBook.fileName
        })
      })
      this.setShelfList(shelfList).then(() => {
        saveBookShelf(this.shelfList)
        if (cb) cb()
      })
      this.deleteCache(selectedBooks)
    },
    deleteCache (selectedBooks) {
      selectedBooks.forEach(book => {
        removeLocalForage(
          book.fileName,
          () => {
            book.cache = false
            saveBookShelf(this.shelfList)
            this.createSampleToast(this.$t('shelf.removeFromShelfSuccessful'))
          },
          () => {
            this.createSampleToast('删除失败')
          }
        )
      })
    }
  }
}
