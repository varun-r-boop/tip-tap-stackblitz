import { Component, OnInit } from '@angular/core';

import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [EditorComponent],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
