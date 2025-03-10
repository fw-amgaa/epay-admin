import { CheckCircle2, CircleIcon, CircleX } from "lucide-react";

export function getStatusIcon(status: boolean) {
  return status ? CheckCircle2 : CircleX || CircleIcon;
}
