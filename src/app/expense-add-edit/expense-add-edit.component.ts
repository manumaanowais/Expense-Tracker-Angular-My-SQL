import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseService } from '../services/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-add-edit',
  templateUrl: './expense-add-edit.component.html',
  styleUrls: ['./expense-add-edit.component.css']
})
export class ExpenseAddEditComponent implements OnInit{

  expenseForm: FormGroup
  month:string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = new Date();
  currentMonth:string=this.months[this.date.getMonth()-1];

  constructor(private _fb:FormBuilder, private _expService:ExpenseService, private _dialogRef:MatDialogRef<ExpenseAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
    this.expenseForm = this._fb.group({
      date:'',
      month:[this.currentMonth, Validators.required],
      salary:['', Validators.required],
      expense:['', Validators.required],
      amount:['', Validators.required],
    })
  }

  ngOnInit() {
    this.expenseForm.patchValue(this.data)
  }

  onFormSubmit(){
    this.expenseForm.markAllAsTouched();
    if(this.expenseForm.valid){
      if(this.data){
        this._expService.updateExpense(this.data.id,this.expenseForm.value).subscribe({
          next: (val:any) =>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          Toast.fire({
              icon: 'success',
              title: 'Expense Details Updated'
          })
            this._dialogRef.close(true)
          },
          error: (err:any) => {
            console.error(err)
          }
        })
      } else{
        this._expService.addExpense(this.expenseForm.value).subscribe({
          next: (val:any) =>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          Toast.fire({
              icon: 'success',
              title: 'Expense Added Successfully'
          })
            this._dialogRef.close(true)
          },
          error: (err:any) => {
            console.error(err)
          }
        })
      }
      
    }
  }
}
