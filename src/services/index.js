const BaseAuthorization = {
  baseURL: 'https://backendapi.turing.com',
  token:  {'user-key': localStorage.getItem("accessToken")}
};

export default BaseAuthorization;
