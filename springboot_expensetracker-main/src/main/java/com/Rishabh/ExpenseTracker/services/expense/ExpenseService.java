package com.Rishabh.ExpenseTracker.services.expense;

import com.Rishabh.ExpenseTracker.dto.ExpenseDTO;
import com.Rishabh.ExpenseTracker.entity.Expense;
import org.springframework.stereotype.Service;

import java.util.List;


public interface ExpenseService {
    Expense postExpense(ExpenseDTO expenseDTO);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);

    Expense updateExpense(Long id,ExpenseDTO expenseDTO);

    void deleteExpense(Long id);
}
