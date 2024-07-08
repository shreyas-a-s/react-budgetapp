// rrd imports
import { Link } from "react-router-dom";

// helper imports
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"

const ExpenseItem = ({ expense }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      <td>
        <Link
        to={`/budget/${budget.id}`}
          style={{
            "--accent": budget.color,
          }}
        >
          {budget.name}
        </Link>
      </td>
    </>
  )
}
export default ExpenseItem
