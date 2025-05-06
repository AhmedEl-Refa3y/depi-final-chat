import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";
import { useToast } from "../context/ToastContext";

const useAuthUser = () => {
  const { showToast } = useToast();

  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Session expired. Please login again.",
        "error"
      );
    },
  });

  return {
    isLoading: authUser.isLoading,
    isError: authUser.isError,
    authUser: authUser.data?.user,
  };
};

export default useAuthUser;
