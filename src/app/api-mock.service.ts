import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiMockService {

  constructor(
  ) {
  }

  // public getAllTodos(): Observable<Todo[]> {
  //   return Observable.of([
  //     new Todo({id: 1, title: 'Read article', complete: false})
  //   ]);
  // }

  // public createTodo(todo: Todo): Observable<Todo> {
  //   return Observable.of(
  //     new Todo({id: 1, title: 'Read article', complete: false})
  //   );
  // }

  
}
