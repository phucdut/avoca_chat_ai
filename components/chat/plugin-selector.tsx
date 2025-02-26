"use client";

import * as React from "react";
import {
  Search,
  Sparkles,
  Calculator,
  LayoutDashboardIcon as LayoutCanvas,
  BarChart,
  Plus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Plugin {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled?: boolean;
}

const plugins: Plugin[] = [
  {
    id: "web-search",
    name: "Web Search",
    icon: <Search className="h-4 w-4" />,
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    id: "calculator",
    name: "Simple Calculator",
    icon: <Calculator className="h-4 w-4" />,
  },
  {
    id: "canvas",
    name: "Interactive Canvas",
    icon: <LayoutCanvas className="h-4 w-4" />,
  },
  {
    id: "chart",
    name: "Render Chart",
    icon: <BarChart className="h-4 w-4" />,
  },
];

export function PluginSelector() {
  const [enablePlugins, setEnablePlugins] = React.useState(true);
  const [activePlugins, setActivePlugins] = React.useState<string[]>([]);

  const activeCount = activePlugins.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[70px] justify-between bg-background"
        >
          <Plus className="h-4 w-4 text-blue-500" />
          {activeCount}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="font-normal">
            Enable Plugins
          </DropdownMenuLabel>
          <Switch checked={enablePlugins} onCheckedChange={setEnablePlugins} />
        </div>
        <DropdownMenuSeparator />
        {enablePlugins &&
          plugins.map((plugin) => (
            <DropdownMenuItem
              key={plugin.id}
              className="flex items-center justify-between px-3 py-2 focus:bg-accent"
            >
              <div className="flex items-center gap-2">
                {plugin.icon}
                <span>{plugin.name}</span>
              </div>
              <Switch
                checked={activePlugins.includes(plugin.id)}
                onCheckedChange={(checked) => {
                  setActivePlugins(
                    checked
                      ? [...activePlugins, plugin.id]
                      : activePlugins.filter((id) => id !== plugin.id)
                  );
                }}
                disabled={!enablePlugins}
              />
            </DropdownMenuItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-3 py-2">
          <Plus className="mr-2 h-4 w-4" />
          Manage Plugins
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
