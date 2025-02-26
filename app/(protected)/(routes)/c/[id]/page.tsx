import React from "react";
import { SidebarLeft } from "@/components/sidebar-left";
import { cookies } from "next/headers";
import { cache } from "react";
import ChatHomeForm from "@/components/chat/chat-home";

// const getDetail = cache(productApiRequest.getDetail);

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ProductDetailPage({
  params,
  searchParams,
}: Props) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  //   let product = undefined; // Changed from null to undefined
  //   try {
  //     const { payload } = await getDetail(sessionToken?.value ?? "", params.id);
  //     product = payload;
  //   } catch (error) {
  //     // Handle error if needed
  //     console.error("Error fetching product:", error);
  //   }

  return (
    <div>
      <ChatHomeForm />
    </div>
  );
}
