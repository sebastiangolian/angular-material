import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note, NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes = new BehaviorSubject<Note[]>([]);
  currentNote: Note = { id: -1, text: '', title: '' };
  createNote = false;
  editNote = false;
  editNoteForm: FormGroup;

  dataSource: any = [
    { name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4 },
    { name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6 },
    { name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4 },
    { name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4 },
  ];
  displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs', 'protein']


  constructor(private formBuilder: FormBuilder, private notesModel: NotesService) { }

  ngOnInit() {
    this.notesModel.subscribe(this.notes);
    this.editNoteForm = this.formBuilder.group({
      text: ['', Validators.required],
      title: ['', Validators.required]
    });
  }

  onSelectNote(id: number) {
    this.currentNote = this.notesModel.get(id);
  }

  noteSelected(): boolean {
    return this.currentNote.id >= 0;
  }

  onNewNote() {
    this.editNoteForm.reset();
    this.createNote = true;
    this.editNote = true;
  }

  onEditNote() {
    if (this.currentNote.id < 0) return;
    this.editNoteForm.get('title').setValue(this.currentNote.title);
    this.editNoteForm.get('text').setValue(this.currentNote.text);
    this.createNote = false;
    this.editNote = true;
  }

  onDeleteNote() {
    if (this.currentNote.id < 0) return;
    this.notesModel.delete(this.currentNote.id);
    this.currentNote = { id: -1, text: '', title: '' };
    this.editNote = false;
  }

  updateNote() {
    if (!this.editNoteForm.valid) return;
    const title = this.editNoteForm.get('title').value;
    const text = this.editNoteForm.get('text').value;
    if (this.createNote) {
      this.currentNote = this.notesModel.add(title, text);
    } else {
      const id = this.currentNote.id;
      this.notesModel.update(id, title, text);
      this.currentNote = { id, title, text };
    }
    this.editNote = false;
  }
}