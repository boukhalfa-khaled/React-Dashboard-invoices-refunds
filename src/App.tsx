import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Customer from './pages/Customer';
import Users from './pages/Users';
import Invoices from './pages/Invoices';
import Services from './pages/services';
import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';
import ViewCustomer from './pages/ViewCustomer';
import AddDocument from './pages/AddDocument';
import EditDocument from './pages/EditDocument';
import AddService from './pages/AddService';
import AddInvoice from './pages/AddInvoice';
import EditService from './pages/EditService';
import EditInvoice from './pages/EditInvoice';
import ForgetPassword from './pages/Authentication/ForgetPassword';
import NewPassword from './pages/Authentication/NewPassword';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        
        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Customer />
            </>
          }
        />
            <Route
              path="/customers"
              element={
                <>
                  <PageTitle title="Customeres | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Customer />
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <PageTitle title="Users | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Users />
                </>
              }
            />
            <Route
              path="/invoices"
              element={
                <>
                  <PageTitle title="Invoices | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Invoices />
                </>
              }
            />
            <Route
              path="/edit-service/:id"
              element={
                <>
                  <PageTitle title="Invoices | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <EditService/>
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <PageTitle title="Invoices | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Services />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                  <Profile />
                </>
              }
            />
          </Route>
          <Route path="/view-customer" element={<Navigate to="/customers" />} />
          <Route
            path="/view-customer/:id"
            element={
              <>
                <PageTitle title="Customers | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ViewCustomer />
              </>
            }
          />
          <Route
            path="/edit-document/:id"
            element={
              <>
                <PageTitle title="Docuemnts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <EditDocument/>
              </>
            }
          />
          <Route
            path="/add-document/:id"
            element={
              <>
                <PageTitle title="Docuemnts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddDocument/>
              </>
            }
          />
          <Route
            path="/add-customer"
            element={
              <>
                <PageTitle title="Customers | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddCustomer />
              </>
            }
          />
          <Route path="/edit-customer" element={<Navigate to="/customers" />} />
          <Route
            path="/edit-customer/:id"
            element={
              <>
                <PageTitle title="Customers | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <EditCustomer />
              </>
            }
          />
          <Route
            path="/add-service"
            element={
              <>
                <PageTitle title="Services | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddService/>
              </>
            }
          />
          <Route
            path="/add-invoice"
            element={
              <>
                <PageTitle title="Invoices | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddInvoice/>
              </>
            }
          />
          <Route
            path="/edit-invoice/:id"
            element={
              <>
                <PageTitle title="Invoices | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <EditInvoice/>
              </>
            }
          />




        </Route>
        {/* private routes */}
        
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/auth/forgetPassword"
          element={
            <>
              <PageTitle title="Forget Password| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ForgetPassword/>
            </>
          }
        />

        <Route
          path="/auth/new-password"
          element={
            <>
              <PageTitle title="Forget Password| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <NewPassword/>
            </>
          }
        />

      </Routes>
    </>
  );
}

export default App;
