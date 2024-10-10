import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularNodeViewComponent } from 'ngx-tiptap';
import { BehaviorSubject } from 'rxjs';

interface CustomImageData {
  src?: string;
  title?: string;
  alt?: string;
}
@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.css'],
  imports: [AsyncPipe, NgIf],
  standalone: true,
})
export class CustomImageComponent
  extends AngularNodeViewComponent
  implements OnChanges
{
  public data$ = new BehaviorSubject<CustomImageData>({
    src: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg',
    title: '',
    alt: '',
  });

  ngOnChanges(changes: SimpleChanges): void {
    const val = this.data$.getValue();

    if (this.node.attrs.src) {
      this.data$.next({ ...val, src: this.node.attrs.src });
    }
  }
}
