import {Pipe} from "@angular/core";

@Pipe({name : "absolute"})
export class AbsoluteValuePipe {
  transform (input : number) {
    return Math.abs(input);
  }
}