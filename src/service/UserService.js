import axiosInstance from "./AxiosInstance";

const UserService = () => {
  const getByEmail = async (email) => {
    try {
      const response = await axiosInstance.post("users/email", {
        email
      });
      console.log(response.data);

      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || response.status);
      }
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  };

  const getAll = async () => {
    try {
      const response = await axiosInstance.get("users");
      console.log(response.data);
      
      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || response.status);
      }
    } catch (error) {
        console.log(error)
      throw new Error(error.response?.data?.message);
    }
  };

  return {
    getByEmail,
    getAll
  };
};

export default UserService
