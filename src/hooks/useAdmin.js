"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

export default function useAdmin() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/auth/admin/${encodeURIComponent(user.email)}`
      );
      return res.data?.isAdmin;
    },
    enabled: !!user?.email,
  });
  return [isAdmin, isPending];
}
