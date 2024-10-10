import { Injector } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { CustomImageComponent } from './custom-image.component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (attributes: {
        src: string;
        title: string;
        alt: string;
      }) => ReturnType;
    };
  }
}

const CustomImageExtension = (injector: Injector): Node => {
  return Node.create({
    name: 'customImage',
    draggable: true,
    editable: false,
    // content & group = need for work!
    content: 'inline*',
    group: 'block',

    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },
    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
      };
    },
    parseHTML() {
      return [{ tag: 'app-custom-image' }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['app-custom-image', mergeAttributes(HTMLAttributes)];
    },
    addNodeView() {
      return AngularNodeViewRenderer(CustomImageComponent, { injector });
    },
    addCommands() {
      return {
        setImage:
          (attributes) =>
          ({ commands }) => {
            return commands.setNode(this.name, attributes);
          },
      };
    },
    addKeyboardShortcuts() {
      return {};
    },
  });
};

export default CustomImageExtension;
// 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg';
