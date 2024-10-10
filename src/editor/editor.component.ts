import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { EditorService } from './editor.service';
import { NgxTiptapModule } from 'ngx-tiptap';
import { Editor } from '@tiptap/core';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [AsyncPipe, NgxTiptapModule, NgIf],
  providers: [EditorService],
})
export class EditorComponent implements OnInit {
  public editor$!: Observable<Editor | null>;

  constructor(public editorService: EditorService) {}

  ngOnInit() {
    this.editor$ = this.editorService.editor$;
    this.editorService.init();
  }

  ngOnDestroy(): void {
    this.editorService.destroy();
  }
}
