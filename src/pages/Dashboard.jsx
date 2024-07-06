// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

//helper functions
import { useLoaderData } from "react-router-dom";
import { createBudget, fetchData } from "../helpers"

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
}

const Dashboard = () => {
const { userName, budgets } = useLoaderData()

  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>Welcome back, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ): <Intro />}
    </div>
  )
}

export default Dashboard
