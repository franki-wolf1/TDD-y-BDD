import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface Transaction {
  id: number;
  amount: number;
  sender: string;
  recipient: string;
  status: 'pending' | 'completed' | 'failed';
}

export class AddTransaction {
  static readonly type = '[Transaction] Add';
  constructor(public payload: Transaction) {}
}

export class UpdateTransactionStatus {
  static readonly type = '[Transaction] Update Status';
  constructor(public id: number, public status: 'completed' | 'failed') {}
}

export class TransactionStateModel {
  transactions: Transaction[];
}

@State<TransactionStateModel>({
  name: 'transactions',
  defaults: {
    transactions: []
  }
})
export class TransactionState {
  @Selector()
  static transactions(state: TransactionStateModel) {
    return state.transactions;
  }

  @Action(AddTransaction)
  addTransaction(ctx: StateContext<TransactionStateModel>, action: AddTransaction) {
    const state = ctx.getState();
    ctx.setState({
      transactions: [...state.transactions, action.payload]
    });
  }

  @Action(UpdateTransactionStatus)
  updateTransactionStatus(ctx: StateContext<TransactionStateModel>, action: UpdateTransactionStatus) {
    const state = ctx.getState();
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
