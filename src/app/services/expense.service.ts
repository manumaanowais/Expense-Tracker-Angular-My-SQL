import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  todayDate = new Date();
  currentDay= String(this.todayDate.getDate()).padStart(2, '0');
  currentMonth = String(this.todayDate.getMonth()+1).padStart(2,"0");
  currentYear = this.todayDate.getFullYear();
  currentDate = `${this.currentDay}-${this.currentMonth}-${this.currentYear}`;

  constructor(private _http:HttpClient) { }

  addExpense(data:any) : Observable<any>{
    data.date = this.currentDate
    console.warn('Data : ',data)
    return this._http.post('http://localhost:8080/expenses',data)
  }

  getExpenses() : Observable<any>{
    return this._http.get('http://localhost:8080/expenses')
  }

  updateExpense(id:number, data:any) : Observable<any>{
    return this._http.put(`http://localhost:8080/expenses/${id}`,data)
  }

  deleteExpense(id:number) : Observable<any>{
    return this._http.delete(`http://localhost:8080/expenses/${id}`)
  }
}
