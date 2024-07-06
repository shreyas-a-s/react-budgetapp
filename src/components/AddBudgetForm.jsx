// react imports
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid"

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create Budget
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget"> Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g.: Groceries"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount"> Budget Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g.: ₹100"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="addBudget"/>
        <button type="submit" className="btn btn--dark">
          <span>Create budget</span>
          <CurrencyRupeeIcon width={20}/>
        </button>
      </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm
