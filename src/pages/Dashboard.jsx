// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

//helper functions
import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData, waait } from "../helpers"

// library
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets }
}

// actions
export async function dashboardAction({request}) {
  await waait();

  const data = await request.formData()
  const { _action, ...values } = Object.fromEntries(data)

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Welcome, ${values.userName} 👋`)
    } catch(e) {
      throw new Error("Creating account was not successful.")
    }
  }

  if (_action === "addBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount
      })
      return toast.success(`Budget created! 👍`)
    } catch(e) {
      throw new Error("Creating budget was not successful.")
    }
  }

  if (_action === "addExpense") {
    try {
      return toast.success(`Expense ${values.newExpense} created! 👍`)
    } catch(e) {
      throw new Error("Creating expense was not successful.")
    }
  }
}

const Dashboard = () => {
const { userName, budgets } = useLoaderData()

  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            {
              budgets && budgets.length > 0
                ? (
                  <div className="grid-lg">
                    <div className="flex-lg">
                      <AddBudgetForm />
                      <AddExpenseForm budgets={budgets}/>
                    </div>
                  </div>
                ) : (
                  <div className="grid-sm">
                    <p>Personal budgeting is the secret to financial freedom.</p>
                    <p>Create a budget to get started.</p>
                    <AddBudgetForm />
                  </div>
                )
            }
          </div>
        </div>
      ): <Intro />}
    </div>
  )
}

export default Dashboard
