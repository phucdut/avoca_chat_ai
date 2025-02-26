"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Building2,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Store,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
  Truck,
  Megaphone,
  User,
  NotebookText,
  BaggageClaim,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import "@/app/globals.css";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl"; // Import useTranslations từ next-intl

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sidebar.navMain"); // Sử dụng useTranslations với namespace "navMain"
  const u = useTranslations("sidebar.navSecondary"); // Sử dụng useTranslations với namespace "navSecondary"

  // Cập nhật data để sử dụng bản dịch
  const data = {
    navMain: [
      // {
      //   title: t("askAi"),
      //   url: t("urlAsk"),
      //   icon: Sparkles,
      // },
      {
        title: t("homepage"),
        url: t("urlHomepage"),
        icon: Home,
        isActive: true,
      },
      {
        title: t("products"),
        url: "#",
        icon: BaggageClaim,
        items: [
          {
            title: t("manageProducts"),
            url: t("urlManageProducts"),
          },
          {
            title: "Manage Options",
            url: "product/option/manage",
          },
          // {
          //   title: t("salesContent"),
          //   url: t("urlSalesContent"),
          // },
          // {
          //   title: t("addNewProduct"),
          //   url: t("urlAddNewProduct"),
          // },
        ],
      },
      {
        title: t("stores"),
        url: t("urlStores"),
        icon: Store,
        isActive: true,
      },
      {
        title: t("aiAgent"),
        url: "#",
        icon: Bot,
        items: [
          {
            title: t("manageAiAgent"),
            url: t("urlManageAiAgent"),
          },
          {
            title: t("addNewAiAgent"),
            url: t("urlAddNewAiAgent"),
          },
        ],
      },
      {
        title: t("orders"),
        url: t("urlOrders"),
        icon: NotebookText,
        isActive: true,
      },
      {
        title: t("shipping"),
        url: "#",
        icon: Truck,
        items: [
          {
            title: t("shippingOptions"),
            url: t("urlShipping"),
          },
        ],
      },
      {
        title: t("promotions"),
        url: "#",
        icon: Megaphone,
        items: [
          {
            title: t("campaigns"),
            url: t("urlCampaigns"),
          },
          {
            title: t("promotionalTools"),
            url: t("urlPromotionalTools"),
          },
        ],
      },
      {
        title: t("reviews"),
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: t("productReview"),
            url: t("urlProductReview"),
          },
          {
            title: t("serviceReview"),
            url: t("urlServiceReview"),
          },
        ],
      },
      {
        title: t("myAccount"),
        url: "#",
        icon: User,
        items: [
          {
            title: t("sellerProfile"),
            url: t("urlSellerProfile"),
          },
          {
            title: t("accountSettings"),
            url: t("urlAccountSettings"),
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: u("calendar"),
        url: "#",
        icon: Calendar,
      },
      {
        title: u("settings"),
        url: "#",
        icon: Settings2,
      },
      {
        title: u("trash"),
        url: "#",
        icon: Trash2,
      },
      {
        title: u("help"),
        url: "#",
        icon: MessageCircleQuestion,
      },
    ],
  };

  return (
    <Sidebar
      className="bg-white shadow-xl pt-[56px]"
      {...props}
      collapsible="icon"
    >
      <SidebarHeader className="scrollbar-custom overflow-y-auto">
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent className="">
        {/* Optional: Add more components here */}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {/* <NavSecondary items={data.navSecondary} className="" /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
