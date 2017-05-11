import { Pipe, PipeTransform } from "@angular/core";
import { Playlist } from "../components/models/playlist.model";
import { PlaylistState } from "../components/services/playlist-state.service";

@Pipe({
    name: "myfilter",
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    constructor (public playlistState : PlaylistState) {

    }
    transform(items : Playlist[], filter : RegExp) : any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        let itemList = items.filter(item => filter.test(item.title));
        if (itemList.length === 0) {
            this.playlistState.notFound = true;
        } else {
            this.playlistState.notFound = false;
        }
        return itemList;
    }
}