import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IncomeService } from 'src/app/services/income/income.service';

@Component({
  selector: 'app-update-income',
  templateUrl: './update-income.component.html',
  styleUrls: ['./update-income.component.scss']
})
export class UpdateIncomeComponent {

  id:number = this.activatedRoute.snapshot.params[`id`];
  incomeForm!: FormGroup;
  listOfCategory: any[] = ["Salary","Freelancing","Investments","Stocks","Bitcoin","Bank Transfer","Youtube","Other"];

  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private incomeService: IncomeService, 
    private activatedRoute: ActivatedRoute,
  ) { }

    ngOnInit(){
      this.incomeForm = this.fb.group({
        title: [null,Validators.required],
        amount: [null,[Validators.required]],
        date: [null,[Validators.required]],
        category: [null,[Validators.required]],
        description: [null,[Validators.required]],
      });
      this.getIncomeById();
    }

    getIncomeById(){
      this.incomeService.getIncomeById(this.id).subscribe(res=>{
        this.incomeForm.patchValue(res);
      }, error=>{
        this.message.error("Something went wrong", {nzDuration : 5000})
      })
    }

    submitForm(){
     this.incomeService.updateIncome(this.id, this.incomeForm.value).subscribe(res=>{
      this.message.success("Income Updated Successfully", {nzDuration:5000});
      this.router.navigateByUrl("/income")
     }, error=>{
      this.message.error("Error while updating income", {nzDuration:5000});
     }); 
    }
}
