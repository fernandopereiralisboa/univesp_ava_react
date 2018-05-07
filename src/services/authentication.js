import client from './client';

export const authenticate = (login, password) => {
  const payload = {
    data: {
      login,
    },
    params: {
      password,
    },
  };

  return new Promise((resolve, reject) => {
    client.post('authentications', payload)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};
