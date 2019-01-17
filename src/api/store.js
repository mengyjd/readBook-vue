import axios from 'axios'

export function home () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}

export function detail (fileName) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: fileName
    }
  })
}

export function list () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/list`
  })
}

export function shelf() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/shelf`
  })
}