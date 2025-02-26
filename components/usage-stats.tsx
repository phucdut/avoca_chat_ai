import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Building2, Calendar, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

interface UsageStatsProps {
  credits: number;
  maxCredits: number;
  trialDays: number;
  chatbotsUsed: number;
  maxChatbots: number;
}

export function UsageStats({
  credits = 500,
  maxCredits = 1000,
  trialDays = 7,
  chatbotsUsed = 1,
  maxChatbots = 50,
}: UsageStatsProps) {
  return (
    <div className="space-y-3 px-3 pb-2">
      {/* Credits */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            <span>{credits} credits</span>
          </div>
          <span className="text-xs text-muted-foreground">{maxCredits}</span>
        </div>
        <Progress value={(credits / maxCredits) * 100} className="h-[2px]" />
      </div>

      {/* Trial Days */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{trialDays} trial days</span>
          </div>
          <span className="text-xs text-muted-foreground">14</span>
        </div>
        <Progress value={(trialDays / 14) * 100} className="h-[2px]" />
      </div>

      {/* AI Chatbots */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>
              {chatbotsUsed}/{maxChatbots} AI chatbots
            </span>
          </div>
        </div>
        <Progress
          value={(chatbotsUsed / maxChatbots) * 100}
          className="h-[2px]"
        />
      </div>
      <Link href="/plans" passHref>
        <div className="text-sm text-center bg-[#1d1d1f] text-white h-10 rounded-md flex items-center justify-center mt-2">
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade to Pro
        </div>
      </Link>
    </div>
  );
}
