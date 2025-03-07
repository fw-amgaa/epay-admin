import {
  CheckCircle2,
  CircleIcon,
  CircleX
} from "lucide-react";

export function getStatusIcon(status: boolean) {
  return status ? CheckCircle2 : CircleX || CircleIcon;
}

// export function getPriorityIcon(priority: any["priority"]) {
//   const priorityIcons = {
//     high: ArrowUpIcon,
//     low: ArrowDownIcon,
//     medium: ArrowRightIcon,
//   };

//   return priorityIcons[priority] || CircleIcon;
// }
