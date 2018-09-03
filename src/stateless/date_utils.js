export function compareDate (a, b) {
    if (a.getFullYear() < b.getFullYear()) {
        return -1
    } else if (a.getFullYear() > b.getFullYear()) {
        return 1
    } else {
        if (a.getMonth() < b.getMonth()) {
            return -1
        } else if (a.getMonth() > b.getMonth()) {
            return 1
        } else {
            if (a.getDate() < b.getDate()) {
                return -1
            } else if (a.getDate() > b.getDate()) {
                return 1
            } else {
                return 0
            }
        }
    }
}
