import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../components/models/user.model";
import { UserListState } from "../components/services/userlist-state.service";

@Pipe({
    name: "myuserfilter",
    pure: false
})
export class MyUserFilterPipe implements PipeTransform {
    constructor (public userlistState : UserListState) {

    }
    transform(items : User[], filter : RegExp) : any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        let itemList = items.filter(item => filter.test(item.name));
        if (itemList.length === 0) {
            this.userlistState.notFound = true;
        } else {
            this.userlistState.notFound = false;
        }
        return itemList;
    }
}