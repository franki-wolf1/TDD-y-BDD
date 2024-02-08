import { State, Action, StateContext, Selector } from '@ngxs/store';

// Interfaz que define la estructura de una transacción bancaria
export interface Transaction {
  id: number;
  amount: number;
  sender: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
}

// Acción para agregar una nueva transacción
export class AddTransaction {
  static readonly type = '[Transaction] Add';
  constructor(public payload: Transaction) {}
}

// Acción para guardar una transacción pendiente
export class PendingTransaction {
  static readonly type = '[Transaction] Update Status';
  constructor(public id: number, public status: 'pending') {}
}

// Acción para actualizar el estado de una transacción existente
export class UpdateTransactionStatus {
  static readonly type = '[Transaction] Update Status';
  constructor(public id: number, public status: 'completed' | 'failed') {}
}

// Modelo de estado para las transacciones
export class TransactionStateModel {
  transactions: Transaction[];
}

// Estado de las transacciones
@State<TransactionStateModel>({
  name: 'transactions',
  defaults: {
    transactions: []
  }
})
export class TransactionState {
  // Selector para obtener la lista de transacciones
  @Selector()
  static transactions(state: TransactionStateModel) {
    return state.transactions;
  }

  // Manejador de la acción 'AddTransaction'
  @Action(AddTransaction)
  addTransaction(ctx: StateContext<TransactionStateModel>, action: AddTransaction) {
    const state = ctx.getState();
    // Agrega la nueva transacción al estado
    ctx.setState({
      transactions: [...state.transactions, action.payload]
    });
  }

  // Manejador de la acción 'UpdateTransactionStatus'
  @Action(UpdateTransactionStatus)
  updateTransactionStatus(ctx: StateContext<TransactionStateModel>, action: UpdateTransactionStatus) {
    const state = ctx.getState();
    // Actualiza el estado de una transacción existente
    const transactions = state.transactions.map(transaction => {
      if (transaction.id === action.id) {
        return { ...transaction, status: action.status };
      }
      return transaction;
    });
    ctx.setState({
      transactions
    });
  }
}
