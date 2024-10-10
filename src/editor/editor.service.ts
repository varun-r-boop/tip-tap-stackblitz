import { Injectable, Injector } from '@angular/core';
import { Editor } from '@tiptap/core';
import { BehaviorSubject } from 'rxjs';
import { StarterKit } from '@tiptap/starter-kit';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Heading from '@tiptap/extension-heading';
import Code from '@tiptap/extension-code';
import FloatingMenu from '@tiptap/extension-floating-menu';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Placeholder from '@tiptap/extension-placeholder';
import Paragraph from '@tiptap/extension-paragraph';
import CustomImageExtension from '../custom-image/custom-image.extention';
import { HighlightExtension } from '../extensions/highlight.extension';

@Injectable()
export class EditorService {
  public editor$ = new BehaviorSubject<Editor | null>(null);
  private editor: Editor | null = null;

  constructor(private injector: Injector) {}

  init(): void {
    this.destroy();

    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2],
            HTMLAttributes: {
              class: 'tiptap-heading',
            },
          },
        }),
        Paragraph.extend({
          draggable: true,
        }),
        Italic,
        Bold,
        BulletList,
        OrderedList,
        ListItem,
        Heading.configure({
          levels: [1, 2],
        }),
        Code.configure({
          HTMLAttributes: {
            class: 'code',
          },
        }),
        BubbleMenu.configure({
          updateDelay: 150,
        }),
        Placeholder.configure({
          emptyNodeClass: 'my-custom-is-empty-class',
          emptyEditorClass: 'is-editor-empty',
          includeChildren: true,
          placeholder: ({ node }) => {
            if (node.type.name === 'customImage') {
              return '';
            } else if (node.type.name === 'heading') {
              return 'Add a title';
            }

            return 'Enter text or add a block';
          },
        }),
        CustomImageExtension(this.injector),
        HighlightExtension,
      ],
      editable: true,
      autofocus: false,
      injectCSS: true,
      onCreate({ editor }) {
        editor.commands.setNode('heading');
      },
      onUpdate({ editor }) {
        // console.log('result: ', editor && editor!.getJSON());
      },
    });

    this.editor$.next(this.editor);
  }

  destroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  toggleOrderedList() {
    this.editor!.commands.toggleOrderedList();
  }

  toggleBold() {
    this.editor!.commands.toggleBold();
  }

  toggleItalic() {
    this.editor!.chain().focus().toggleItalic().run();
  }

  toggleH1() {
    this.editor!.commands.toggleHeading({ level: 1 });
  }

  toggleH2() {
    this.editor!.commands.toggleHeading({ level: 2 });
  }

  toggleCode() {
    this.editor!.chain().focus().toggleCode().run();
  }

  toggleHighlight() {
    this.editor!.chain().focus().toggleHighlight().run();
  }

  public addImage(): void {
    // https://media.istockphoto.com/id/1322123064/photo/portrait-of-an-adorable-white-cat-in-sunglasses-and-an-shirt-lies-on-a-fabric-hammock.jpg
    const url = prompt('Please enter image url');
    this.editor!.commands.setImage({
      src: url || '',
      alt: 'some image',
      title: 'hello! i am image',
    });
  }
}
