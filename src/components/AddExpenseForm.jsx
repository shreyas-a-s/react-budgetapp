// react imports
import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom"

// library
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3"> Add New <span className="accent">
        {
          budgets.length === 1 && `${budgets.map((budg) => budg.name)}`
        }
      </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense"> Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g.: Tea"
              required
              ref={focusRef}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount"> Expense Amount</label>
            <input
              type="number"
              step="0.01"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g.: ₹100"
              required
              inputMode="decimal"
            />
          </div>
        </div>
        <input type="hidden" name="_action" value="addExpense"/>
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Adding Expense...</span> : (
              <>
                <span>Add Expense</span>
                <PlusCircleIcon width={20}/>
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
