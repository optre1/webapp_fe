import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './auth/Login';
import TokenLogin from './auth/TokenLogin';
import TaskForm from './tasks/TaskForm';
import DealsForm from './deals/DealsForm';
import UserForm from './users/UserForm';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TokenLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks/create" element={<TaskForm />}></Route>
          <Route path="/deals/create" element={<DealsForm />}></Route>
          <Route path="/users/create" element={<UserForm />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;
