import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "filesize" })
export class FilesizePipe implements PipeTransform {
    transform(value : number) : string {
        let int : number = null;

        try {
            int = parseInt("" + value);
        } catch (e) {
            int = null;
            return "";
        }

        let bytes = int / 8;

        if (bytes < 1) {
            return int.toFixed(1) + " b";
        }

        let KB = bytes / 1024;

        if (KB < 1) {
            return bytes.toFixed(1) + " B";
        }

        let MB = KB / 1024;

        if (MB < 1) {
            return KB.toFixed(1) + " KB";
        }

        let GB = MB / 1024;

        if (GB < 1) {
            return MB.toFixed(1) + " MB";
        }

        return GB.toFixed(1) + " GB";

    }
}
