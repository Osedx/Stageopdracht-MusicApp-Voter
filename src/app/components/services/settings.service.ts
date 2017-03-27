import { Injectable, Inject } from "@angular/core";
import { APP_CONFIG, IAppConfig } from "../../app.config";

@Injectable()
export class SettingService {
    removeAfterDislikes : number;
    addToToplist : number;
    addFromToplist : number;

    constructor(@Inject(APP_CONFIG) private config : IAppConfig) {
    this.removeAfterDislikes = config.removeAfterDislikes;
    this.addToToplist = config.addToToplist;
    this.addFromToplist = config.addFromToplist;
    }
}