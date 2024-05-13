import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useLocation, useNavigate } from "react-router-dom";

const INVOICES_URL = 'invoices'

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const InvoicesTable = () => {

const [invoices, setInvoices] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () => {
        try {
            const response = await axiosPrivate.get(INVOICES_URL, {
                signal: controller.signal
            });
            console.log(response.data);
            let  invoicess = Array.from(response.data);
            setInvoices(invoicess);
        } catch (err) {
          if(!err?.response){
            console.log("no response from server");
          } else{
            console.log(err);
          }
        }
    }

    getProfile();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, [successMsg]);


const handleDelete = async (id, InvoiceName) => {
  try {
    const response = await axiosPrivate.delete(`${INVOICES_URL}/${id}`, 
    {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }
    );
     if (response.status === 204) {
      setSuccessMsg(`Invoice ${InvoiceName} deleted successfully.`);
    } else {
      setErrMsg('Something Went Wrong');
    }
  } catch (err) {
        setErrMsg('unexpected problem');
        console.log(err);
  }
}









  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                title
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                customer
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                service
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                total 
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                updated_at
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {invoice.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {invoice.customer_id.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {invoice.service_id.title}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {invoice.total} DA
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-success text-success'
                        : invoice.status === 'unpaid'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {invoice.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(invoice.update_at)} 
                  </p>
                </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      // to={`/view-invoice/${invoice.id}`}
                      className="inline-flex items-center justify-center bg-green-600 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-invoice/${invoice.id}`}
                      className="inline-flex items-center justify-center bg-orange-600 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-2"
                    >
                      Edite
                    </Link>
                    <button
                    onClick={()=> handleDelete(invoice.id, invoice.name)}
                      
                      className="inline-flex items-center justify-center bg-red-600 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesTable;
