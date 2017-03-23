import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG, IAppConfig } from "../../app.config";

@Injectable()
export class SettingService {
    deleteByDislikes : number;
    resetSongsAfterDays : number;

    constructor(@Inject(APP_CONFIG) private config : IAppConfig) {
             // You can use config.apiEndpoint now
    this.deleteByDislikes = config.deleteByDislikes;
    this.resetSongsAfterDays = config.resetSongsAfterDays;
    }
}