import { UserRole } from "@/constants/roles";
import { useSession } from "./useSession";

export const useRole = () => {
  const { user, loading } = useSession();

  return {
    loading,
    isStudent: user?.role === UserRole.STUDENT,
    isTutor: user?.role === UserRole.TUTOR,
    isAdmin: user?.role === UserRole.ADMIN,
  };
};
