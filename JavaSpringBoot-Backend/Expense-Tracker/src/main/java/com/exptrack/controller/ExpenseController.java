package com.exptrack.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.exptrack.model.Expense;
import com.exptrack.service.ExpenseService;



@Controller
@CrossOrigin(origins = "*")
public class ExpenseController {
	
	@Autowired
	private ExpenseService expenseService;

	@PostMapping("/expenses")
	public ResponseEntity<Expense> addExpense(@RequestBody Expense exp) {
		expenseService.createExpense(exp);
		return ResponseEntity.ok(exp); 
	}
	
	@GetMapping("/expenses")
	public ResponseEntity<List<Expense>> getExpenses(){
		return ResponseEntity.ok(expenseService.getExpenses()) ;
	}
	
	@PutMapping("/expenses/{id}")
	public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense exp) {
		Expense updatedExpense = expenseService.getExpenseById(id);
		updatedExpense.setMonth(exp.getMonth());
		updatedExpense.setSalary(exp.getSalary());
		updatedExpense.setExpense(exp.getExpense());
		updatedExpense.setAmount(exp.getAmount());
		expenseService.updateExpense(id, updatedExpense);
		return ResponseEntity.ok(updatedExpense);
	}
	
	@DeleteMapping("/expenses/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteExpense(@PathVariable Long id){
		expenseService.deleteExpense(id);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
