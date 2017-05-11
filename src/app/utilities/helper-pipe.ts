import { isDescending } from "./utils";

export function OrderByArrayHelper(
    values : any[],
    orderType : string,
    descending = false) : any[] {
    try {
        return values.sort((a, b) => {
            if (a[orderType] < b[orderType]) {
                return descending ? 1  : -1;
            } else if (a[orderType] > b[orderType]) {
                return descending ? -1  : 1;
            }
            return 0;
        });
    } catch (e) {
        throw e;
    }
}

export function OrderByDateHelper(values : any[], property : string, descending = false) : any[] {
    try {
        if (descending) {
            values.sort(function (a, b) {
                return new Date(a[property]).getTime() - new Date(b[property]).getTime();
            });
        } else {
            values.sort(function (a, b) {
                return new Date(b[property]).getTime() - new Date(a[property]).getTime();
            });
        }
    } catch (e) {
        throw e;
    }
    return values;
}

export function OrderByNumberHelper(values : number[], property : string, descending = true) : any[] {
    try {
        if (descending) {
            values.sort(function (a, b) {
                if (a[property] === b[property]) return new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime();
                else return b[property] - a[property]; });
        } else {
            values.sort(function (a, b) { return a[property] - b[property]; });
        }
    } catch (e) {
        throw e;
    }
    return values;
}

export function OrderByStringHelper(values : string[], property : string, descending = false) : any[] {
    try {
        if (descending) {
            values.sort((a, b) => 0 - (a[property] > b[property] ? 1  : -1));
        } else {
            values.sort((a, b) => 0 - (b[property] > a[property] ? 1  : -1));
        }
    } catch (e) {
        throw e;
    }
    return values;
}