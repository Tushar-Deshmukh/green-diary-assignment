import { Route, Routes } from "react-router-dom";
import User from "./components/User";
import UserDetails from "./components/UserDetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={<User />}/>
        <Route path='/user-details' element={<UserDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
