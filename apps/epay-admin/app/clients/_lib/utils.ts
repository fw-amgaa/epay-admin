import { CheckCircle2, CircleHelp, CircleIcon, CircleX, Timer } from 'lucide-react';

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: 'inactive' | 'active') {
    const statusIcons = {
        inactive: CircleX,
        active: CheckCircle2,
        'in-progress': Timer,
        todo: CircleHelp,
    };

    return statusIcons[status] || CircleIcon;
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns A React component representing the priority icon.
 */
// export function getPriorityIcon(priority: Client["priority"]) {
//   const priorityIcons = {
//     high: ArrowUpIcon,
//     low: ArrowDownIcon,
//     medium: ArrowRightIcon,
//   };

//   return priorityIcons[priority] || CircleIcon;
// }
