import axiosInstance from "./AxiosInstance";

const ProcurementRequestService = () => {
  const add = async ({
    userId,
    procurementCategoryId,
    procurementDetailRequests,
  }) => {
    try {
      const response = await axiosInstance.post("procurements", {
        userId,
        procurementCategoryId,
        procurementDetailRequests,
      });
      console.log(response.data);

      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || response.status);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.response?.data?.message);
    }
  };

  return {
    add,
  };
};

export default ProcurementRequestService;
