/** 
 * @param target iso 8601 time
 * @returns human readable
*/
export function timeSince(target: string): string {
    const targetTs = Date.parse(target);
    const diffMs = Date.now() - targetTs;
    if (isNaN(diffMs)) {
        return ""
    }

    const weeks = diffMs / 604800000;
    if (weeks > 1) {
        return `${weeks | 0}w`;
    }

    const days = diffMs / 86400000;
    if (days > 1) {
        return `${days | 0}d`;
    }

    const hours = diffMs / 3600000;
    if (hours > 1) {
        return `${hours | 0}h`;
    }

    const mins = diffMs / 60000;
    if (mins > 1) {
        return `${mins | 0}m`;
    }

    return "now";
}
