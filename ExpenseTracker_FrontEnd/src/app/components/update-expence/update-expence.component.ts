import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ExpenseService } from 'src/app/services/expense/expense.service';

@Component({
  selector: 'app-update-expence',
  templateUrl: './update-expence.component.html',
  styleUrls: ['./update-expence.component.scss']
})
export class UpdateExpenceComponent {

  expenseForm!: FormGroup;
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

  expenses: any;
  id: number;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      Title: [null, Validators.required],
      amount: [null, Validators.required],
      date: [null, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
    });
    this.getExpenseById();
  }

  getExpenseById(): void {
    this.expenseService.getExpenseById(this.id).subscribe(
      (res) => {
        this.expenseForm.patchValue(res);
      },
      (error) => {
        this.message.error("Something went wrong.", { nzDuration: 5000 });
      }
    );
  }

  submitForm(): void {
    if (this.expenseForm.valid) {
      this.expenseService.updateExpense(this.id, this.expenseForm.value).subscribe(
        (res) => {
          this.message.success("Successfully updated expense", { nzDuration: 5000 });
          this.router.navigateByUrl("/expense");
        },
        (error) => {
          this.message.error("Error while updating expense", { nzDuration: 5000 });
        }
      );
    } else {
      this.message.error("Please fill out the form correctly.", { nzDuration: 5000 });
    }
  }
}