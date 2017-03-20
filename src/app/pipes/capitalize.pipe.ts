import { Pipe } from "@angular/core";

@Pipe({
  name: "capitalize"
})
export class CapitalizePipe {
    transform(str : string, isOnlyFirstChar? : boolean) : string {
        if (typeof str === "string" && str.length) {

            // Capitalize only first character of the whole string.
            if (isOnlyFirstChar) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }

            // Capitalize first character of all words.
            return str.replace(/\b\w/g, (l) => l.toUpperCase());
        }
    }
}
