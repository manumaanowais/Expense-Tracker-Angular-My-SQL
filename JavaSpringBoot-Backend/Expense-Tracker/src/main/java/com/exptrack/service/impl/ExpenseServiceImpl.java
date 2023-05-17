package com.exptrack.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exptrack.model.Expense;
import com.exptrack.repo.ExpenseRepository;
import com.exptrack.service.ExpenseService;


@Service
public class ExpenseServiceImpl implements ExpenseService{
	
	@Autowired
	private ExpenseRepository expenseRepository;

	@Override
	public Expense createExpense(Expense exp) {
		return expenseRepository.save(exp);
	}

	@Override
	public List<Expense> getExpenses() {
		return expenseRepository.findAll();
	}

	@Override
	public void deleteExpense(Long id) {
		expenseRepository.deleteById(id);
	}

	@Override
	public void updateExpense(Long id, Expense exp) {
		expenseRepository.save(exp);
	}

	@Override
	public Expense getExpenseById(Long id) {
		return expenseRepository.findById(id).get();
	}

}
