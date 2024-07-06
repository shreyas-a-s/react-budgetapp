// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";

//helper functions
import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers"

// library
import { toast } from "react-toastify";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName }
}

// actions
export async function dashboardAction({request}) {
  const data = await request.formData()
  const formData = Object.fromEntries(data)
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName))
    return toast.success(`Welcome, ${formData.userName} 👋`)
  } catch(e) {
    throw new Error("Creating account was not successful.")
  }
}

const Dashboard = () => {
const { userName } = useLoaderData()

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
