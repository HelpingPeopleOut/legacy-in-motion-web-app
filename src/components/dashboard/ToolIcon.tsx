import {
  LayoutDashboard,
  Shield,
  Layers,
  TrendingUp,
  Lock,
  GitBranch,
  Activity,
  PiggyBank,
  Vault,
  BarChart3,
  Calculator,
  Clock,
  Users,
  ClipboardCheck,
  GraduationCap,
  Home,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  vault: Vault,
  chart: BarChart3,
  activity: Activity,
  layers: Layers,
  trending: TrendingUp,
  piggy: PiggyBank,
  "git-branch": GitBranch,
  lock: Lock,
  zap: Calculator,
  calculator: Calculator,
  clock: Clock,
  users: Users,
  clipboard: ClipboardCheck,
  graduation: GraduationCap,
  "home-shield": Home,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}
