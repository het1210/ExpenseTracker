import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './components/expense/expense.component';
import { UpdateExpenceComponent } from './components/update-expence/update-expence.component';
import { IncomeComponent } from './components/income/income.component';
import { UpdateIncomeComponent } from './components/update-income/update-income.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component'; // Make sure this import exists

const routes: Routes = [
  { path: "", component: LoginComponent }, // Login page as default
  { path: "dashboard", component: DashboardComponent },
  { path: "expense", component: ExpenseComponent },
  { path: "income", component: IncomeComponent },
  { path: "expense/:id/edit", component: UpdateExpenceComponent },
  { path: "income/:id/edit", component: UpdateIncomeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
