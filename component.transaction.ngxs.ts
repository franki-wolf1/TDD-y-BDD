import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transaction } from './transaction.state';
import { AddTransaction } from './transaction.actions';

@Component({
  selector: 'app-transaction-form',
  template: `
    <form (submit)="submitForm()">
      <input type="text" placeholder="Sender" [(ngModel)]="sender">
      <input type="text" placeholder="Recipient" [(ngModel)]="recipient">
      <input type="number" placeholder="Amount" [(ngModel)]="amount">
      <button type="submit">Submit</button>
    </form>
  `
})
export class TransactionFormComponent {
  sender: string;
  recipient: string;
  amount: number;

  constructor(private store: Store) {}

  submitForm() {
    const transaction: Transaction = {
      id: Math.floor(Math.random() * 1000), // Genera un ID aleatorio (simulación)
      sender: this.sender,
      recipient: this.recipient,
      amount: this.amount,
      status: 'pending'
    };
    this.store.dispatch(new AddTransaction(transaction));
    this.resetForm();
  }

  resetForm() {
    this.sender = '';
    this.recipient = '';
    this.amount = null;
  }
}
