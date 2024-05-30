import axiosInstance from "./AxiosInstance";

const AuthService = () => {
  const login = async (payload) => {
    try {
      console.log(payload);
      const response = await axiosInstance.post("auth/login", payload);
      console.log(response.data);

      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  const forgotPassword = async (email) => {
    try {
      const requestBody = {
        to: email,
      };

      const response = await axiosInstance.post(
        "auth/reset-password",
        requestBody
      );

      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || "Password reset failed");
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Password reset failed"
      );
    }
  };

  return {
    login,
    forgotPassword,
  };
};

export default AuthService;
