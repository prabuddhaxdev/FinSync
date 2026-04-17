import { getTransaction } from "@/actions/transaction";
import { AddTransactionForm } from "../_components/transaction-form";
import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";

export default async function AddTransactionPage({ searchParams }) {
  const editId = searchParams?.edit;

  // fetch accounts
  const accounts = await getUserAccounts();

  let initialData = null;


  if (editId) {
    const transaction = await getTransaction(editId);

    if (transaction) {
      initialData = {
        ...transaction,
        amount: transaction.amount?.toString() || "",
        date: transaction.date,
      };
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">
          {editId ? "Edit Transaction" : "Add Transaction"}
        </h1>
      </div>

      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories} 
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}