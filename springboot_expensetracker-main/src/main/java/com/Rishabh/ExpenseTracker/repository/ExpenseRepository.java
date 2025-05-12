package com.Rishabh.ExpenseTracker.repository;

import com.Rishabh.ExpenseTracker.entity.Expense;
import com.Rishabh.ExpenseTracker.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository // This annotation is used to indicate that the class provides the mechanism for storage, retrieval, search, update and delete operation on objects.


public interface ExpenseRepository extends JpaRepository<Expense,Long> { // This interface extends JpaRepository which is a JPA specific extension of Repository. It contains the full API of CrudRepository and PagingAndSortingRepository.

    List<Expense> findByDateBetween(LocalDate startDate, LocalDate endDate);


    @Query("SELECT SUM(e.amount) FROM Expense e")
    Double sumAllAmounts();

    Optional<Expense> findFirstByOrderByDateDesc();
}
