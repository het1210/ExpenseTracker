package com.Rishabh.ExpenseTracker.dto;


import com.Rishabh.ExpenseTracker.entity.Expense;
import com.Rishabh.ExpenseTracker.entity.Income;
import lombok.Data;

import java.util.List;

@Data
public class GraphDTO {

    private List<Expense> expenseList;

    private List<Income> incomeList;

}
