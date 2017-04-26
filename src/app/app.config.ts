import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

//    removeAfterDislikes -> remove song after x amount dislikes
//    addToToplist -> add song to toplist after x amount likes
//    maxSongSearch -> maximum amount of songs searched

export interface IAppConfig {
    removeAfterDislikes : number;
    addToToplist : number;
    maxSongSearch : number;
}

export const AppConfig : IAppConfig = {
    removeAfterDislikes : 3,
    addToToplist : 3,
    maxSongSearch : 20 // Uneven numbers will be one higher.
};