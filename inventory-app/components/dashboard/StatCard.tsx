import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // if you have it; otherwise inline classes

type Variant = "blue" | "red" | "green" | "purple";

const styles: Record<Variant, { wrap: string; icon: string }> = {
  blue: { wrap: "bg-blue-50", icon: "text-blue-600" },
  red: { wrap: "bg-red-50", icon: "text-red-600" },
  green: { wrap: "bg-green-50", icon: "text-green-600" },
  purple: { wrap: "bg-purple-50", icon: "text-purple-600" },
};

export type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: Variant;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = "blue",
}: StatCardProps) {
  const v = styles[variant];
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center shadow-sm border",
            v.wrap
          )}
        >
          <Icon className={cn("h-6 w-6", v.icon)} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold leading-tight">{value}</p>
        </div>
      </div>
    </Card>
  );
}
