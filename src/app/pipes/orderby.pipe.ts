import { Pipe, PipeTransform } from "@angular/core";
import { isNull, isValidOrderType } from "../utilities/utils";
import { OrderByDateHelper, OrderByStringHelper, OrderByNumberHelper } from "../utilities/helper-pipe";
import * as MESSAGE from "../utilities/messages";
@Pipe({
    name: "orderBy"
})
export class OrderBy implements PipeTransform {
    transform(values : any[], property) : any {
        if (isNull(values)) { throw new Error(MESSAGE.ERROR_NULL); }
        switch (property) {
        case "createdAt":
            return OrderByDateHelper(values, property);
        case "rating":
            return OrderByNumberHelper(values, property);
        case "title":
            return OrderByStringHelper(values, property);
        case "uploader":
            return OrderByStringHelper(values, property);
        case "name":
            return OrderByStringHelper(values, property);
        case "role":
            return OrderByStringHelper(values, property);
    }
}
}