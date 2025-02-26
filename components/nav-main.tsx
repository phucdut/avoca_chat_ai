"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { usePathname } from "next/navigation";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useLocale } from "next-intl";

type NavItem = {
  title: string;
  url: string;
  icon?: any; // Nếu có kiểu icon cụ thể, thay thế `any` tại đây
  isActive?: boolean;
  items?: NavItem[]; // Mảng chứa các mục con (nếu có)
};

export function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const localeActive = useLocale(); // Lấy locale hiện tại

  return (
    <SidebarMenu>
      {items.map((item) => {
        const itemUrlWithLocale = `/${localeActive}`; // Thêm locale vào URL
        const isActive = pathname.endsWith(item.url);

        return item.items ? (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  {/* <span>{item.title}</span> */}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={`${itemUrlWithLocale}/${subItem.url}`}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{
                children: item.title,
                hidden: false,
              }}
            >
              <a href={`${itemUrlWithLocale}/${item.url}`}>
                {item.icon && <item.icon />}
                {/* <span>{item.title}</span> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
