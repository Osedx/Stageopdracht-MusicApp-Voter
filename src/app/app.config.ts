import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

//    removeAfterDislikes -> remove song after x amount dislikes
//    addToToplist: number -> add song to toplist after x amount likes
//    addFromToplist -> add song from toplist if playlist.count <= x

export interface IAppConfig {
    removeAfterDislikes : number;
    addToToplist : number;
    addFromToplist : number;
}

export const AppConfig : IAppConfig = {
    removeAfterDislikes : 3,
    addToToplist : 1,
    addFromToplist: 10
};