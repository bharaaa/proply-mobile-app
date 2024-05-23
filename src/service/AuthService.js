import axios from 'axios';

const AuthService = () => {
  const login = async (payload) => {
    try {
      console.log(payload);
      const {data} = await axios.post("https://proply.as.r.appspot.com/api/v1/auth/login", payload);
      console.log(data);
      
      if (data.statusCode === 200) {
          return data;
      } else {
          throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
        throw new Error('Login failed');
    }
  }

  return {
    login,
  }
}

export default AuthService;
