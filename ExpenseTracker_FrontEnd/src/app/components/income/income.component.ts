import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  incomes: any[] = [];
  incomeForm!: FormGroup;

  listOfCategory: string[] = [
    "Salary", "Freelancing", "Investments", "Stocks",
    "Bitcoin", "Bank Transfer", "Youtube", "Other"
  ];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private incomeService: IncomeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllIncome();

    this.incomeForm = this.fb.group({
      title: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [null, Validators.required],
      category: [null, Validators.required], // ✅ Fixed name
      description: ['']
    });
    
  }

  getAllIncome(): void {
    this.incomeService.getAllIncome().subscribe({
      next: (res) => {
        this.incomes = res;
      },
      error: () => {
        this.message.error("Error while fetching income", { nzDuration: 5000 });
      }
    });
  }

  submitForm(): void {
    if (this.incomeForm.invalid) {
      this.message.warning('Please fill in all required fields.', { nzDuration: 4000 });
      return;
    }

    this.incomeService.postIncome(this.incomeForm.value).subscribe({
      next: () => {
        this.message.success("Successfully posted income", { nzDuration: 5000 });
        this.incomeForm.reset();
        this.getAllIncome();
      },
      error: () => {
        this.message.error("Error while posting income", { nzDuration: 5000 });
      }
    });
  }

  UpdateIncome(id: number): void {
    this.router.navigateByUrl(`/income/${id}/edit`);
  }
  deleteIncome(id: number) {
    this.incomeService.deleteIncome(id).subscribe({
      next: () => {
        this.message.success("Income deleted successfully", { nzDuration: 5000 });
        this.getAllIncome();
      },
      error: () => {
        this.message.error("Error while deleting Income", { nzDuration: 5000 });
      }
    });
  }
}

