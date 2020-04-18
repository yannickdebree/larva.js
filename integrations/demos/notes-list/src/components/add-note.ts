import { createComponent } from '@snake.js/core';
import { Output } from '@snake.js/core/lib/nodes';

interface Note {
  id?: number;
  title: string;
  content: string;
}

interface AddNoteComponent {
  newNote: Note;
  onTitleChange($event: Event): void;
  onAddNote(): void;
}

export const addNote = createComponent<AddNoteComponent>('add-note', function($output: Output) {
  return {
    newNote: { title: undefined, content: undefined },
    onTitleChange($event: Event) {
      this.newNote.title = ($event.target as any).value;
    },
    onAddNote() {
      $output.emit('addNote', this.newNote);
    }
  };
}).setTemplate(
  `<input type="text" s-on-keyup="onTitleChange($event)" placeholder="New note"/>
  <textarea></textarea>
  <button s-on-click="onAddNote($event)">Add note</button>`
);
