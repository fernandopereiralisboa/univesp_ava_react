import axios from 'axios';
import qs from 'qs';
import Hawk from 'hawk';

class Client {
  constructor(options) {
    const opts = Object.assign({
      baseUrl: 'https://cursos.univesp.br/',
      credentials: null,
    }, options);

    const createClient = () => {
      const client = axios.create({
        baseURL: opts.baseUrl,
        paramsSerializer: function paramsSerializer(params) {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      });

      client.interceptors.request.use(
        config => this.addAuthorizationHeader(config),
        err => Promise.reject(err),
      );

      return client;
    };

    this.opts = opts;
    this.credentials = opts.credentials;
    this.client = createClient();
  }

  setCredentials(credentials) {
    if (!credentials.data) {
      this.credentials = null;
      return;
    }

    this.credentials = {
      key: credentials.data.key,
      algorithm: 'sha256',
      id: credentials.id,
    };
  }

  addAuthorizationHeader(config) {
    const {
      method,
      url,
      baseURL,
      params = null,
    } = config;
    const updatedConfig = config;

    let queryString = '';

    if (this.credentials) {
      if (params) {
        queryString = qs.stringify(params, { arrayFormat: 'repeat' });
      }

      let fullUrl = baseURL + url;

      if (queryString) {
        fullUrl += `?${queryString}`;
      }

      const hawkOpts = {
        credentials: this.credentials,
      };

      const header = Hawk.client.header(fullUrl, method.toUpperCase(), hawkOpts);

      updatedConfig.headers.authorization = header.header;
    }

    return updatedConfig;
  }

  handleError(err) { // eslint-disable-line class-methods-use-this
    return Promise.reject(err);
  }

  get(route, options) {
    return Promise.resolve(this.client(route, options))
      .catch(this.handleError);
  }

  post(route, data, options) {
    return Promise.resolve(this.client.post(route, data, options))
      .catch(this.handleError);
  }

  put(route, data, options) {
    return Promise.resolve(this.client.put(route, data, options))
      .catch(this.handleError);
  }

  patch(route, data, options) {
    return Promise.resolve(this.client.patch(route, data, options))
      .catch(this.handleError);
  }

  delete(route, options) {
    return Promise.resolve(this.client.delete(route, options))
      .catch(this.handleError);
  }
}

export default new Client();
