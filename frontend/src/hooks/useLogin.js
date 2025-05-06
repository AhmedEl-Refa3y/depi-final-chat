import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import { useToast } from "../context/ToastContext";

const useLogin = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      showToast("Login successful!", "success");
    },
    onError: (error) => {
      showToast(error.response?.data?.message || "Login failed!", "error");
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
