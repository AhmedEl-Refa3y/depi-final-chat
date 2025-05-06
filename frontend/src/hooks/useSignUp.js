import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import { useToast } from "../context/ToastContext";

const useSignUp = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      showToast("Account created successfully!", "success");
    },
    onError: (error) => {
      showToast(
        error.response?.data?.message || "Signup failed. Please try again.",
        "error"
      );
    },
  });

  return { isPending, error, signupMutation: mutate };
};

export default useSignUp;
