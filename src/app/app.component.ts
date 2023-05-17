import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';
import { ExpenseService } from './services/expense.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
    date = new Date();
    currentMonth:string=this.months[this.date.getMonth()-1];

  totalExpensesList:any=[];
  totalFilteredExpenseList:any =[]
  dbMonth:string[]=[]
  index:any
  displaySalary:number=0
  displayedColumns: string[] = [
    'id',
    'date',
    'month',
    'salary',
    'expense',
    'amount',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _expService: ExpenseService) {}
  ngOnInit() {
    this.getExpenseList()
  }

  openAddEditExpenseForm() {
    const dialogRef = this._dialog.open(ExpenseAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenseList()
        }
      },
    })
  }
  totExp = 0;
  remaining:number = 0;
  m:any='';
  value:any;
  getExpenseList() {
    this._expService.getExpenses().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dbMonth = this.dataSource.filteredData.map(i => i.month)
        this.m = document.getElementById("selectedmonths");//Get the index of selected month
        this.value = this.m.options[this.m.selectedIndex].value;//Get the selected month
        this.index = this.dbMonth.indexOf(this.value)
        this.displaySalary=this.dataSource.filteredData[this.index]?.salary
        this.dataSource.filter = this.value;//Filtering data based on selected month
        const amountsForSelectedMonth = this.dataSource.filteredData.filter(i => i.month === this.value).map(i => i.amount);
        this.totExp = document.getElementById("total-expense")!.innerHTML = amountsForSelectedMonth.reduce((a:number, b:number) => a + b, 0)
        this.remaining = this.displaySalary - this.totExp
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: console.log,
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
    const amountsForSelectedMonth =  this.dataSource.filteredData.filter(i => i.month === this.value).map(i => i.amount);
    this.totExp = document.getElementById("total-expense")!.innerHTML = amountsForSelectedMonth.reduce((a:number, b:number) => a + b, 0) + 0.00
    this.remaining = this.displaySalary - this.totExp
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editExpense(data: any) {
    const dialogRef = this._dialog.open(ExpenseAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpenseList()
        }
      },
    })
  }

  deleteExpense(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete expense with id : "+id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._expService.deleteExpense(id).subscribe({
          next: (res) => {
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
              title: 'Expense Deleted'
            })
            this.getExpenseList()
          },
          error: console.log
        })
      }
    })
  }
}
