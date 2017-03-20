import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "safeDate"
})
export class SafeDatePipe extends DatePipe {
  transform(date : string, pattern? : string) : string {

    if (isNaN(Date.parse(date))) {
        console.warn("Invalid date in safeDate pipe: \"" + date + "\"");
        return "";
    }

    return super.transform(date, pattern);
  }
}
