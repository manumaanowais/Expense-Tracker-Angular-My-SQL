package com.exptrack.service;

import java.util.List;

import com.exptrack.model.Expense;

public interface ExpenseService {
	
	public Expense createExpense(Expense exp);
	
	public List<Expense> getExpenses();
	
	public Expense getExpenseById(Long id);
	
	public void updateExpense(Long id,Expense exp);
	
	public void deleteExpense(Long id);
}
