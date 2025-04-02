import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';
  public todos: Todo[] = [];
  public title: string='Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
    // this.todos.push(new Todo(1, 'Passear com o cachorro', false));
    // this.todos.push(new Todo(2, 'Ir ao supermercado', false));
    // this.todos.push(new Todo(3, 'Cortar o cabelo', true));
  }

  add(){
    //this.form.value => {title: 'title'}; outra forma de chamar a chamada abaixo
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id,title, false));
    this.save();//para persistir os dados session/local storage
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo){

    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }
  
  markAsDone(todo: Todo){
    todo.done = true; 
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false; 
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data); //para salvar na local storage
    //sessionStorage.setItem('todos', data); // para salvar na session storage
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data)
    this.todos = data !== null ? JSON.parse(data) :this. todos = []; // verifica se o data vem null seta o data pra array vazio
  }

  changeMode(mode: string){
    this.mode = mode;
  }
}
