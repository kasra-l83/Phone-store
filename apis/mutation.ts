import { useMutation } from "@tanstack/react-query";

import { login } from "./users.api";

export const useLogin = () => {
  return useMutation({ mutationFn: login, mutationKey: ["login"] });
}