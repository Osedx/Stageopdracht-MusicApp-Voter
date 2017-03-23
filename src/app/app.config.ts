import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    deleteByDislikes : number;
    resetSongsAfterDays : number;
}

export const AppConfig : IAppConfig = {
    deleteByDislikes : 3,
    resetSongsAfterDays : 1
};