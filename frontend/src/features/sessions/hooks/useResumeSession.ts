import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeSession } from "../services/sessions-api";
import { sessionKeys } from "./useSessions";

export function useResumeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => resumeSession(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}
