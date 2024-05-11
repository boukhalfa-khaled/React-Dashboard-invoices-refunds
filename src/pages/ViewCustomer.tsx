import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


const CUSTOMER_URL = 'customers/';





const ViewCustomer: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate  = useAxiosPrivate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("")
  const [created_by_name, setCreated_by_name] = useState("")

  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCustomer = async () => {
        try {
            const customerData = await axiosPrivate.get(`${CUSTOMER_URL}${id}`, {
                signal: controller.signal
            });
            console.log(customerData.data)
            setEmail(customerData.data.email)
            setName(customerData.data.name)
            setPhone(customerData.data.phone)
            setAddress(customerData.data.address)
            setDescription(customerData.data.description || '') 
            const created_by_id= customerData.data.created_by;
            const created_byData = await axiosPrivate.get(`/users/${created_by_id}`, {
                signal: controller.signal
            });
            setCreated_by_name(created_byData.data.name)
            const documentsData = await axiosPrivate.get(`${CUSTOMER_URL}${customerData.data.id}/documents/`, {
                signal: controller.signal
            });
            let  documentss = Array.from(documentsData.data);
            console.log(documentsData)
            setDocuments(documentss)


        } catch (err) {
          if(!err?.response){
            console.log("no response from server");
          } else if (err.response?.status === 500) {
            navigate('/auth/signin', { state: { from: location }, replace: true });
            await logout();
          } else{
            console.log(err);
          }
        }
    }

    getCustomer();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, []);


  return (
    <DefaultLayout>
      <Breadcrumb pageName="View A Customer" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className='mx-15 my-10'>
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-black dark:text-white">
              Customer Information
            </h3>
            {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p> */}
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  Full name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                  {name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                  {phone}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  Email address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                {email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  address
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                {address}
                </dd>
              </div>
              {!description ? "" : 
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  About
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                  {description}
                </dd>
              </div>}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  created_by
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                {created_by_name}
                </dd>
              </div>
              {documents.length < 1 ? null  : (
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  Documents
                </dt>
                <dd className="mt-2 text-sm text-black dark:text-white sm:col-span-2 sm:mt-0">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                  >
        {documents.map((document, key) => (
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6" key={key}>
                      <div className="flex w-0 flex-1 items-center">
                        <div className="ml-4 flex min-w-0 flex-1 gap-10">
                          <span className="truncate  font-medium">
                            {document.title}
                          </span>
                          <span className="flex-shrink-0  text-gray-400">
                            {document.file_size < 1024 ? document.file_size + ' Bytes' : document.file_size < 1024 * 1024 ? (document.file_size / 1024).toFixed(2) + ' KB' : (document.file_size / (1024 * 1024)).toFixed(2) + ' MB'}

                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={`${document.file}`}
                          className="font-medium text-red-600 hover:text-indigo-500"
                          target="_blank"
                        >
                        Delete
                        </a>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={`${document.file}`}
                          className="font-medium text-orange-600 hover:text-indigo-500"
                          target="_blank"
                        >
                        Edit 
                        </a>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href={`${document.file}`}
                          className="font-medium text-green-600 hover:text-indigo-500"
                          target="_blank"
                        >
                          Download
                        </a>
                      </div>
                    </li>
        ))}
                  </ul>
                </dd>
              </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCustomer;
