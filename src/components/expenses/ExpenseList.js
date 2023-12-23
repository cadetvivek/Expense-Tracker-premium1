import React from 'react';
import styles from './ExpenseList.module.css';
import { BsCardList } from "react-icons/bs";

const ExpenseList = (props) => {
  return (
    <div className={styles.expenseList}>
      <h2>My Expense List <p><BsCardList/></p></h2>
      <ul>
        {props.expenses.map((expense, index) => (
          <li key={index} className={styles.expenseItem} id={expense.id}>
            <span className={styles.expenseCategory}>{expense.category}</span>
            <span className={styles.expenseDescription}>{expense.description}</span>
            <span className={styles.expenseAmount}>Rs.{expense.amount}</span>
            <button onClick={() => props.editHandler(expense.id)} className={styles.editBtn}>
          Edit
        </button>
        <button onClick={() => props.deleteHandler(expense.id)} className={styles.deleteBtn}>
          Delete
        </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
