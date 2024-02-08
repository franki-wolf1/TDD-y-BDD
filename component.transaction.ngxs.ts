import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
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

  // Método para enviar el formulario de transacción
  submitForm() {
    const transaction: Transaction = {
      id: Math.floor(Math.random() * 1000), // Genera un ID aleatorio (simulación)
      sender: this.sender,
      recipient: this.recipient,
      amount: this.amount,
      status: 'pending'
    };
    // Despacha la acción 'AddTransaction' con la nueva transacción
    this.store.dispatch(new AddTransaction(transaction));
    // Resetea el formulario después de enviar la transacción
    this.resetForm();
  }

  // Método para restablecer los campos del formulario
  resetForm() {
    this.sender = '';
    this.recipient = '';
    this.amount = null;
  }
}
