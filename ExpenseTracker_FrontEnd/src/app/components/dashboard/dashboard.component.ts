import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats/stats.service';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);  

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  stats: any;

  incomes: any;
  expenses: any;

  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

  @ViewChild('incomeLineChartRef') private incomeLineChartRef!: ElementRef;
  @ViewChild('expenseLineChartRef') private expenseLineChartRef!: ElementRef;

  constructor(private statsService: StatsService) {
    this.getStats(); // Can safely be called in constructor
  }

  ngAfterViewInit(): void {
    this.getChartData(); // DOM is now ready for chart rendering
  }

  createLineChart(): void {
    if (!this.incomeLineChartRef || !this.expenseLineChartRef) return;

    const incomectx = this.incomeLineChartRef.nativeElement.getContext('2d');
    const expenseCTx = this.expenseLineChartRef.nativeElement.getContext('2d');

    new Chart(incomectx, {
      type: 'line',
      data: {
        labels: this.incomes.map((income: any) => income.date),
        datasets: [
          {
            label: 'Income',
            data: this.incomes.map((income: any) => income.amount),
            borderWidth: 1,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(expenseCTx, {
      type: 'line',
      data: {
        labels: this.expenses.map((expense: any) => expense.date),
        datasets: [
          {
            label: 'Expenses',
            data: this.expenses.map((expense: any) => expense.amount),
            borderWidth: 1,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getStats(): void {
    this.statsService.getStats().subscribe(
      (res) => {
        console.log(res);
        this.stats = res;
      },
      (error) => {
        console.error('Error fetching stats:', error);
      }
    );
  }

  getChartData(): void {
    this.statsService.getChart().subscribe(
      (res) => {
        if (res.expenseList && res.incomeList) {
          this.incomes = res.incomeList;
          this.expenses = res.expenseList;
          console.log(res);
          this.createLineChart();
        }
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );  
  }

}
