import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter
} from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File,
  // url: SafeUrl
}

@Directive({
  selector: "[appDrag]"
})
export class DragDirective {
  @Output() files: EventEmitter<File[]> = new EventEmitter();

  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files = evt.dataTransfer.files;
    console.log("filess" + files)
    // let files: FileHandle[] = [];
    // for (let i = 0; i < evt.dataTransfer.files.length; i++) {
    //   const file = evt.dataTransfer.files[i];
    //   const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    //   files.push({ file });
    // }
    // if (files.length > 0) {
    //   this.files.emit(files);
    // }
    const valid_files: Array<File> = [];
    const invalid_files: Array<File> = [];
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        console.log("ccc" + file)

        const ext = file.name.split('.')[file.name.split('.').length - 1];
        //if (this.allowed_extensions.lastIndexOf(ext) !== -1) {
        valid_files.push(file);
        console.log("vv" + valid_files)
        this.files.emit(valid_files);
        // } else {
        // invalid_files.push(file);
        // }
      });
      // this.filesInvalidEmiter.emit(invalid_files);
      // if (valid_files.length === 0) {
      //
      return;
      // }
      console.log("vv" + valid_files)
    }
  }
}
