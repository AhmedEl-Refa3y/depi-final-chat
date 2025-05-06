import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { useToast } from "../context/ToastContext";

const useLogout = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      showToast("Logged out successfully!", "success");
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Logout failed. Please try again.",
        "error"
      );
    },
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;
