import './App.css'
import {Counters} from "../modules/counters/Сounters.tsx";
import {UsersList} from "../modules/users/Users-list.tsx";

function App() {


  return (
    <div className="container p-5 flex flex-col gap-5">
      <Counters/>
      <UsersList/>
    </div>
  )
}

export default App
