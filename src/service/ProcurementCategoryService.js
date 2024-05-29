import axiosInstance from './AxiosInstance';

const ProcurementCategoryService = () => {
  const getAll = async () => {
    try {
      const response = await axiosInstance.get("procurement-categories");
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
    getAll
  };
};

export default ProcurementCategoryService