"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  Sparkles,
  Eye,
  Plus,
  Search,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Model {
  id: string;
  name: string;
  icon: string;
  tokens: string;
  isNew?: boolean;
  capabilities: ("vision" | "plugins" | "training")[];
}

const models: Model[] = [
  {
    id: "gpt4o",
    name: "GPT-4o",
    icon: "purple",
    tokens: "128K",
    capabilities: ["plugins", "vision", "training"],
  },
  {
    id: "o3-mini",
    name: "O3 Mini",
    icon: "black",
    tokens: "200K",
    isNew: true,
    capabilities: ["plugins", "training"],
  },
  {
    id: "gemini",
    name: "Gemini 2.0 Flash-Lite",
    icon: "blue",
    tokens: "1M",
    isNew: true,
    capabilities: ["plugins", "vision", "training"],
  },
  {
    id: "claude",
    name: "Claude 3.7 Sonnet",
    icon: "orange",
    tokens: "200K",
    isNew: true,
    capabilities: ["plugins", "vision", "training"],
  },
  {
    id: "o1",
    name: "O1",
    icon: "black",
    tokens: "200K",
    capabilities: ["plugins", "vision", "training"],
  },
  {
    id: "o1-preview",
    name: "O1 Preview",
    icon: "black",
    tokens: "128K",
    capabilities: ["training"],
  },
  {
    id: "o1-mini",
    name: "O1 Mini",
    icon: "black",
    tokens: "128K",
    capabilities: ["training"],
  },
  {
    id: "chatgpt-4o",
    name: "ChatGPT-4o",
    icon: "purple",
    tokens: "128K",
    capabilities: ["vision", "training"],
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o (2024-11-20)",
    icon: "purple",
    tokens: "128K",
    capabilities: ["plugins", "vision", "training"],
  },
];

export function ModelSelector() {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredModels = searchQuery
    ? models.filter((model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : models;

  const getIconColor = (iconType: string) => {
    switch (iconType) {
      case "purple":
        return "bg-purple-500";
      case "black":
        return "bg-black";
      case "blue":
        return "bg-blue-500";
      case "orange":
        return "bg-amber-700";
      default:
        return "bg-purple-500";
    }
  };

  const getIconBg = (iconType: string) => {
    switch (iconType) {
      case "purple":
        return "bg-purple-100";
      case "black":
        return "bg-gray-200";
      case "blue":
        return "bg-blue-100";
      case "orange":
        return "bg-amber-100";
      default:
        return "bg-purple-100";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between bg-background"
        >
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-purple-100 p-1">
              <div className="h-4 w-4 rounded-full bg-purple-500" />
            </div>
            <span>{selectedModel.name}</span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[400px] p-2">
        <div className="px-2 pb-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {filteredModels.map((model) => (
            <DropdownMenuItem
              key={model.id}
              onSelect={() => {
                setSelectedModel(model);
                setOpen(false);
                setSearchQuery("");
              }}
              className="flex py-2 px-2"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-purple-100 p-1">
                    <div className="h-4 w-4 rounded-full bg-purple-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{model.name}</span>
                    {model.isNew && (
                      <span className="rounded-md bg-green-500 px-1.5 py-0.5 text-xs font-medium text-white">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 min-w-[60px] justify-end">
                    {model.capabilities.includes("plugins") && (
                      <Plus className="h-4 w-4 text-blue-500" />
                    )}
                    {model.capabilities.includes("vision") && (
                      <Eye className="h-4 w-4 text-orange-500" />
                    )}
                    {model.capabilities.includes("training") && (
                      <Sparkles className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {model.tokens}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Zap className="h-4 w-4" />
          <span>Change Chat Parameters</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
