import { Command, Mark, mergeAttributes, RawCommands } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      toggleHighlight: () => ReturnType;
    };
  }
}
export const HighlightExtension = Mark.create({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'mark',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands(): Partial<RawCommands> {
    return {
      toggleHighlight:
        (): Command =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export default HighlightExtension;
