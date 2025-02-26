"use client";
import { ModelSelector } from "./model-selector";
import { PluginSelector } from "./plugin-selector";

export function ModelPluginSelector() {
  return (
    <div className="flex items-center gap-2">
      <ModelSelector />
      <PluginSelector />
    </div>
  );
}
