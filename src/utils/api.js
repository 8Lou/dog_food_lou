const onResponse = (res) => {
  return res.json()
}
/* конструктор-скелет через классы */
/* необходим для повторяющихся функций, для этого нужна переменная */
class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
  }
  /* метод */
  getProductList() {
    return fetch(`${this.baseUrl}/products`, {
      method: "GET",
      headers: this.headers,
    }).then(onResponse);
  }
  /* запрос данных о пользователе */
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    }).then(onResponse)
  }
  searchProducts(path) {
    return fetch(`${this.baseUrl}/products/search?query=${path}`, {
      headers: this.headers
    }).then((e) => onResponse(e))
  }
  /* запрос на изменение лайка по нажатию на кнопку */
  addLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "PUT"
    }).then(onResponse)
  }
  /* запрос на удаления лайка по нажатию на кнопку */
  deleteLike(productId) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: "DELETE"
    }).then(onResponse)
  }
  // если стоит лайк - то удалить, и наоборот
  changeProductLike(productId, isLiked) {
    return fetch(`${this.baseUrl}/products/likes/${productId}`, {
      headers: this.headers,
      method: isLiked ? "DELETE" : 'PUT'
    }).then(onResponse)
  }
  getProductById(id) {
    return fetch(`${this.baseUrl}/products/${id}`, {
      headers: this.headers,
    }).then(onResponse)
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    "Content-Type": "application/json",
    /* т к апи требует авторизации, необходимо ввести токен */
    authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDQ1NzNlZTMyOTFkNzkwYjMwNzNkOGQiLCJncm91cCI6IjEyIiwiaWF0IjoxNjgyMzIwMTUwLCJleHAiOjE3MTM4NTYxNTB9.JAgKY9HDB1n6OXtsYFOngnu5K8SMjmyQAMCOtLFK0Ao'
  }
}
/* создать экземпляр объекта и в него экспортировать */
export const api = new Api(config);

/* использование функции вместо класса конструктора */
export const getProductList = () => {
  return fetch(`${config.baseUrl}/products`, {
    method: "GET",
    headers: config.headers,
  }).then(onResponse);
}