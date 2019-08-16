// const axios = require('axios');

// export default class BaseRequest {
//   getUrlPrefix () {
//     return `${API_URL}/api/v1`;
//   }

//   async get (url, params = {}, cancelToken) {
//     try {
//       const config = {
//         params,
//         cancelToken: cancelToken ? cancelToken.token : undefined,
//       };
//       const response = await window.axios.get(this.getUrlPrefix('GET') + url, config);
//       return this._responseHandler(response);
//     } catch (error) {
//       this._errorHandler(error);
//     }
//   }

//   async put (url, data = {}) {
//     try {
//       const response = await window.axios.put(this.getUrlPrefix() + url, data);
//       return this._responseHandler(response);
//     } catch (error) {
//       this._errorHandler(error);
//     }
//   }

//   async post (url, data = {}) {
//     try {
//       const response = await window.axios.post(this.getUrlPrefix() + url, data);
//       return this._responseHandler(response);
//     } catch (error) {
//       this._errorHandler(error);
//     }
//   }

//   async del (url, data = {}) {
//     try {
//       const response = await window.axios.delete(this.getUrlPrefix() + url, { data });
//       return this._responseHandler(response);
//     } catch (error) {
//       this._errorHandler(error);
//     }
//   }

//   async _responseHandler (response) {
//     return response.data;
//   }

//   _errorHandler (err) {
//     if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
//       window.app.$modal.show('warning-login-dialog');
//     }
//     if (err.response && err.response.status === 503) { // maintenance
//       window.location.reload();
//     }
//     throw err;
//   }

// }