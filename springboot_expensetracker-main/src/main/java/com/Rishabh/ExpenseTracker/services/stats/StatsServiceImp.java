package com.Rishabh.ExpenseTracker.services.stats;

import com.Rishabh.ExpenseTracker.dto.GraphDTO;
import com.Rishabh.ExpenseTracker.dto.StatsDTO;
import com.Rishabh.ExpenseTracker.entity.Expense;
import com.Rishabh.ExpenseTracker.entity.Income;
import com.Rishabh.ExpenseTracker.repository.ExpenseRepository;
import com.Rishabh.ExpenseTracker.repository.IncomeRepository;
import com.Rishabh.ExpenseTracker.services.income.IncomeService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
@RequiredArgsConstructor
public class StatsServiceImp  implements StatsService{

    private final IncomeRepository incomeRepository;

    private final ExpenseRepository expenseRepository;

    public GraphDTO getChartData(){
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusMonths(27);

        GraphDTO graphDTO = new GraphDTO();
        graphDTO.setExpenseList((expenseRepository.findByDateBetween(startDate,endDate)));
        graphDTO.setIncomeList(incomeRepository.findByDateBetween(startDate,endDate));

        return graphDTO;
    }

    public StatsDTO getStats(){
        Double totalIncome = incomeRepository.sumAllAmounts();
        Double totalExpense = expenseRepository.sumAllAmounts();

        Optional<Income> optionalIncome = incomeRepository.findFirstByOrderByDateDesc();
        Optional<Expense> optionalExpense = expenseRepository.findFirstByOrderByDateDesc();

        StatsDTO statsDTO = new StatsDTO();
        statsDTO.setExpense(totalExpense);
        statsDTO.setIncome(totalIncome);

        if(optionalIncome.isPresent()){
            statsDTO.setLatestIncome(optionalIncome.get());
        }
        if(optionalExpense.isPresent()){
            statsDTO.setLatestExpense(optionalExpense.get());
        }

        statsDTO.setBalance(totalIncome - totalExpense);

        List<Income> incomeList = incomeRepository.findAll();

        List<Expense> expenseList = expenseRepository.findAll();

        OptionalDouble minIncome = incomeList.stream().mapToDouble(Income::getAmount).min();
        OptionalDouble maxIncome = incomeList.stream().mapToDouble(Income::getAmount).max();

        OptionalDouble minExpense = expenseList.stream().mapToDouble(Expense::getAmount).min();
        OptionalDouble maxExpense = expenseList.stream().mapToDouble(Expense::getAmount).max();


        statsDTO.setMaxExpense(maxExpense.isPresent() ? maxExpense.getAsDouble() :null);
        statsDTO.setMinExpense(minExpense.isPresent() ? minExpense.getAsDouble() :null);

        statsDTO.setMaxIncome(maxIncome.isPresent() ? maxIncome.getAsDouble() :null);
        statsDTO.setMinIncome(minIncome.isPresent() ? minIncome.getAsDouble() :null);

        return statsDTO;
    }
}
