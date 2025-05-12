package com.Rishabh.ExpenseTracker.services.income;

import com.Rishabh.ExpenseTracker.dto.IncomeDTO;
import com.Rishabh.ExpenseTracker.entity.Income;

import java.util.List;

public interface IncomeService {

    Income postIncome(IncomeDTO incomeDTO);

    List<IncomeDTO> getAllIncomes();

    Income updateIncome(Long id,IncomeDTO incomeDTO);

    IncomeDTO getIncomeById(Long id);

    void deleteIncome(Long id);
}
