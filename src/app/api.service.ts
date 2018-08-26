import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.awsURl;

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }


  public  getOtp(mobile): Observable<User> {
    // var obj : User;
    // obj.userRegistrationDto=null;
    // obj.userStatus= "CREATE_NEW_USER"
   
    let body = new URLSearchParams();
    body.set('mobile', mobile);
    return this.http    
      .post(API_URL + 'get-otp',{mobile:mobile})
      .map(response => {
       console.log("GOT Succcess Full ");
       console.log(response.json());
        
        const userDetails = response.json();
        return userDetails;
      })
      .catch(this.handleError);
  }

  public  verifyOtp(otpDetails): Observable<User> {
    // var obj : User;
    // obj.userRegistrationDto=null;
    // obj.userStatus= "CREATE_NEW_USER"
    
    return this.http      
      .post(API_URL + 'verify-otp',{mobile:otpDetails.mobile,otp: otpDetails.otp})
      .map(response => {
        console.log("GOT otp Success ");
        console.log(response.json());
        const userDetails = response.json();
        return userDetails;
      })
      .catch(this.handleError);
  }
  
  public saveUser(userDetails): Observable<User> {
    // var obj : User;
    // obj.userRegistrationDto=null;
    // obj.userStatus= "CREATE_NEW_USER"
    
    return this.http      
      .post(API_URL + 'save-update-user',userDetails)
      .map(response => {
        console.log("GOT otp Success ");
        console.log(response.json());
        const userDetails = response.json();
        return userDetails;
      })
      .catch(this.handleError);
  }
  


/*

  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      })
      .catch(this.handleError);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .map(response => {
        return new Todo(response.json());
      })
      .catch(this.handleError);
  }
*/

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  } 
}
