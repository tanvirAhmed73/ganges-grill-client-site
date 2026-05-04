"use client";

import {
  useQuery,
  type QueryObserverResult,
  type RefetchOptions,
} from "@tanstack/react-query";
import { loadDemoCart } from "@/lib/cart/demo-cart-storage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";

/** Cart row shape from API merged with optional local demo lines */
export type CartLine = {
  _id: string;
  name: string;
  image: string;
  price: number;
  foodId?: string;
};

function mergeServerAndDemo(
  serverRows: unknown,
  email: string | undefined
): CartLine[] {
  const server = (Array.isArray(serverRows) ? serverRows : []) as CartLine[];
  const demo = loadDemoCart(email);
  const serverIds = new Set(server.map((r) => r?._id).filter(Boolean));
  const dedupedDemo = demo.filter((d) => !serverIds.has(d._id));
  return [...server, ...dedupedDemo];
}

export default function useCart(): [
  CartLine[],
  (options?: RefetchOptions) => Promise<QueryObserverResult<CartLine[], Error>>,
] {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`);
      return mergeServerAndDemo(res.data, user?.email);
    },
    enabled: !!user?.email,
  });
  return [cart, refetch];
}
