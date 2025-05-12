import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from 'src/app/services/expense/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent {
  expenseForm!: FormGroup;
  expenses: any;
  
  listOfCategory: string[] = [
    "Education",
    "Groceries",
    "Health",
    "Subscription",
    "Takeaways",
    "Clothing",
    "Traveling",
    "Other"
  ];

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllExpenses();

    // ✅ Fixed form control names to match HTML
    this.expenseForm = this.fb.group({
      title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  submitForm() {
    if (this.expenseForm.valid) {
      this.expenseService.postExpense(this.expenseForm.value).subscribe({
        next: () => {
          this.message.success("Expense posted successfully", { nzDuration: 5000 });
          this.expenseForm.reset(); // optional: clear form after post
          this.getAllExpenses();
        },
        error: () => {
          this.message.error("Error while posting expense", { nzDuration: 5000 });
        }
      });
    } else {
      this.message.warning("Please fill out all required fields");
    }
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().subscribe({
      next: (res) => {
        this.expenses = res;
      },
      error: () => {
        this.message.error("Error fetching expenses", { nzDuration: 5000 });
      }
    });
  }

  updateExpense(id: number) {
    this.router.navigateByUrl(`/expense/${id}/edit`);
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.message.success("Expense deleted successfully", { nzDuration: 5000 });
        this.getAllExpenses();
      },
      error: () => {
        this.message.error("Error while deleting expense", { nzDuration: 5000 });
      }
    });
  }
}
