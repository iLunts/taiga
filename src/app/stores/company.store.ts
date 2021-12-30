import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Company } from '../models/company.model';
import { CompanyService } from '../services/company.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyStore implements OnDestroy {
  private companySubject: BehaviorSubject<Company> = new BehaviorSubject(null);
  public readonly company$: Observable<Company> =
    this.companySubject.asObservable();

  constructor(private companyService: CompanyService) {
    this.fetchCompany();
  }

  ngOnDestroy(): void {
    this.companySubject.complete();
  }

  get company(): Observable<Company> {
    // return asObservable(this.companySubject);
    return this.company$;
  }

  fetchCompany(): void {
    this.companyService.getCompanyData$().subscribe(
      (company: Company) => {
        this.companySubject.next(company);
      },
      (err) => console.log('Error retrieving Company')
    );
  }

  // addTodo(newTodo: Company): Observable<any> {
  //   // let obs = this.todoBackendService.saveTodo(newTodo);

  //   // obs.subscribe((res) => {
  //   //   this._todos.next(this._todos.getValue().push(newTodo));
  //   // });

  //   // return obs;
  //   return null;
  // }

  // toggleTodo(toggled: any): Observable<Company> {
  //   // let obs: Observable = this.todoBackendService.toggleTodo(toggled);

  //   // obs.subscribe((res) => {
  //   //   let todos = this._todos.getValue();
  //   //   let index = todos.findIndex((todo: Todo) => todo.id === toggled.id);
  //   //   let todo: Todo = todos.get(index);
  //   //   this._todos.next(
  //   //     todos.set(
  //   //       index,
  //   //       new Todo({
  //   //         id: toggled.id,
  //   //         description: toggled.description,
  //   //         completed: !toggled.completed
  //   //       })
  //   //     )
  //   //   );
  //   // });

  //   // return obs;
  //   return null;
  // }

  // deleteTodo(deleted: any): Observable<Company> {
  //   // let obs: Observable<Company> = this.todoBackendService.deleteTodo(deleted);

  //   // obs.subscribe((res) => {
  //   //   let todos: List<Todo> = this._todos.getValue();
  //   //   let index = todos.findIndex((todo) => todo.id === deleted.id);
  //   //   this._todos.next(todos.delete(index));
  //   // });

  //   // return obs;
  //   return null;
  // }
}

// function asObservable(company: any): Observable<Company> {
//   throw new Error('Function not implemented.');
// }
