package com.exptrack.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exptrack.model.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

}
