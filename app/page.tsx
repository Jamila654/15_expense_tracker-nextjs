"use client";

import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImCross } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Expense {
  name: string;
  amount: string;
  date: string;
}

export default function Home() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [expenseData, setExpenseData] = useState<Expense>({
    name: "",
    amount: "",
    date: "",
  });

  const handleAddExpense = () => {
    if (!expenseData.name || !expenseData.amount || !expenseData.date) return;
    
    const newExpenses = [...expenses, expenseData];
    const newTotal = newExpenses.reduce(
      (acc, curr) => acc + parseFloat(curr.amount),
      0
    );

    setExpenses(newExpenses);
    setTotal(newTotal);
    setExpenseData({ name: "", amount: "", date: "" });
    setShowForm(false);
  };

  const handleDelete = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    const updatedTotal = updatedExpenses.reduce(
      (acc, curr) => acc + parseFloat(curr.amount),
      0
    );

    setExpenses(updatedExpenses);
    setTotal(updatedTotal);
  };

  const handleEdit = (index: number) => {
    const expenseToEdit = expenses[index];
    setExpenseData(expenseToEdit);
    setShowForm(true);

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-24 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-b-full flex items-center justify-around">
        <div className="title text-nowrap md:text-5xl sm:text-2xl text-lg font-bold">
          Expense Tracker
        </div>
        <div className="total text-nowrap md:text-5xl sm:text-2xl text-lg font-bold">
          Total: ${total.toFixed(2)}
        </div>
      </main>

      <div className="add">
        <CiCirclePlus
          className="absolute bottom-4 right-4 size-10 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full hover:cursor-pointer"
          onClick={() => setShowForm(true)}
        />
      </div>

      {showForm && (
        <div className="create flex items-center justify-center mt-10 sm:mt-20 md:mt-32">
          <Card className="w-[90%] sm:w-[50%] md:w-[30%]">
            <CardHeader className="flex justify-between">
              <CardTitle>Add Expense</CardTitle>
              <ImCross
                className="hover:cursor-pointer self-end -translate-y-7"
                onClick={() => setShowForm(false)}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="expense_name">
                <h1 className="font-bold ml-2">Expense Name</h1>
                <Input
                  value={expenseData.name}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, name: e.target.value })
                  }
                />
              </div>
              <div className="amount">
                <h1 className="font-bold ml-2">Amount</h1>
                <Input
                  type="number"
                  value={expenseData.amount}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, amount: e.target.value })
                  }
                />
              </div>
              <div className="date">
                <h1 className="font-bold ml-2">Date</h1>
                <Input
                  type="date"
                  value={expenseData.date}
                  onChange={(e) =>
                    setExpenseData({ ...expenseData, date: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter className="w-full flex items-center justify-center">
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="display grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {expenses.map((expense, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle>{expense.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="amount">Amount: ${expense.amount}</div>
              <div className="date">Date: {expense.date}</div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <FaEdit
                className="hover:cursor-pointer"
                onClick={() => handleEdit(index)}
              />
              <MdDelete
                className="hover:cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

