import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useAxiosPrivate from '../hooks/useAxiosPrivate';


const DOCUMENT_URL = 'customers/documents';
const CUSTOMER_URL = 'customers/';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};





const ViewCustomer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState([]);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [created_by_name, setCreated_by_name] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCustomer = async () => {
      try {
        const customerData = await axiosPrivate.get(`${CUSTOMER_URL}${id}`, {
          signal: controller.signal,
        });
        console.log(customerData.data);
        setEmail(customerData.data.email);
        setName(customerData.data.name);
        setDate(customerData.data.date);
        setPhone(customerData.data.phone);
        setAddress(customerData.data.address);
        setDescription(customerData.data.description || '');
        const created_by_id = customerData.data.created_by;
        const created_byData = await axiosPrivate.get(
          `/users/${created_by_id}`,
          {
            signal: controller.signal,
          },
        );
        setCreated_by_name(created_byData.data.name);
        const documentsData = await axiosPrivate.get(
          `${CUSTOMER_URL}${customerData.data.id}/documents/`,
          {
            signal: controller.signal,
          },
        );
        let documentss = Array.from(documentsData.data);
        console.log(documentsData);
        setDocuments(documentss);
      } catch (err) {
        if (!err?.response) {
          console.log('no response from server');
        } else if (err.response?.status === 500) {
          navigate('/auth/signin', {
            state: { from: location },
            replace: true,
          });
          await logout();
        } else {
          console.log(err);
        }
      }
    };

    getCustomer();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [successMsg]);

  const handleDelete = async (id, DocumentTitle) => {
    try {
      const response = await axiosPrivate.delete(`${DOCUMENT_URL}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      if (response.status === 204) {
        setSuccessMsg(`Document ${DocumentTitle} deleted successfully.`);
      } else {
        setErrMsg('Something Went Wrong');
      }
    } catch (err) {
      setErrMsg('unexpected problem');
      console.log(err);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View A Customer" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mx-15 my-10">
          <div className="px-4 sm:px-0 my-3">
            <h3 className="text-base font-semibold leading-7 text-black dark:text-white">
              Customer Information
            </h3>
            {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Personal details and application.
            </p> */}
          </div>
            {!errMsg ? (
              ''
            ) : (
              <div className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4 mb-4">
                <div className="mr-4 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                      fill="#ffffff"
                      stroke="#ffffff"
                    ></path>
                  </svg>
                </div>
                <div className="w-full flex item-center ">
                  <h5 className=" font-semibold text-[#B45454]">{errMsg}</h5>
                </div>
              </div>
            )}
            {!successMsg ? (
              ''
            ) : (
              <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4 mb-3">
                <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                      fill="white"
                      stroke="white"
                    ></path>
                  </svg>
                </div>
                <div className="w-full">
                  <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                    {successMsg}
                  </h5>
                </div>
              </div>
            )}
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
                  Date
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                  {date}
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
              {!description ? (
                ''
              ) : (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                    About
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                    {description}
                  </dd>
                </div>
              )}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-black dark:text-white">
                  created_by
                </dt>
                <dd className="mt-1 text-sm leading-6 text-black dark:text-white sm:col-span-2 sm:mt-0">
                  {created_by_name}
                </dd>
              </div>
              {documents.length < 1 ? null : (
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
                        <li
                          className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                          key={key}
                        >
                          <div className="flex w-0 flex-1 items-center">
                            <div className="ml-4 flex min-w-0 flex-1 gap-5">
                              <svg
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                height="1.5em"
                                width="1.5em"
                              >
                                <path
                                  fill="currentColor"
                                  d="M10.404 5.11L9.389 4.096 4.314 9.17a2.152 2.152 0 103.045 3.044l6.09-6.089a3.588 3.588 0 00-5.075-5.074L1.98 7.444l-.014.013c-1.955 1.955-1.955 5.123 0 7.077s5.123 1.954 7.078 0l.013-.014.001.001 4.365-4.364-1.015-1.014-4.365 4.363-.013.013c-1.392 1.392-3.656 1.392-5.048 0a3.572 3.572 0 01.014-5.06l-.001-.001L9.39 2.065c.839-.84 2.205-.84 3.045 0s.839 2.205 0 3.044l-6.09 6.089a.718.718 0 01-1.015-1.014l5.075-5.075z"
                                />
                              </svg>
                              <span className="truncate  font-medium">
                                {document.title}
                              </span>
                              <span className="flex-shrink-0  text-gray-400">
                                {document.file_size < 1024
                                  ? document.file_size + ' Bytes'
                                  : document.file_size < 1024 * 1024
                                  ? (document.file_size / 1024).toFixed(2) +
                                    ' KB'
                                  : (
                                      document.file_size /
                                      (1024 * 1024)
                                    ).toFixed(2) + ' MB'}
                              </span>
                              <span className="flex-shrink-0  text-gray-400">
                                {formatDate(document.created_at)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <button
                              onClick={() =>
                                handleDelete(document.id, document.title)
                              }
                              className="font-medium text-red-600 hover:text-indigo-500"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Link
                              to={`/edit-document/${document.id}`}
                              className="font-medium text-orange-600 hover:text-indigo-500"
                            >
                              Edit
                            </Link>
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
          <div className="flex justify-end ">
            <Link
              to={`/add-document/${id}`}
              className="inline-flex items-center justify-center gap-2.5 rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              <span>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path
                    fill="currentColor"
                    d="M10.404 5.11L9.389 4.096 4.314 9.17a2.152 2.152 0 103.045 3.044l6.09-6.089a3.588 3.588 0 00-5.075-5.074L1.98 7.444l-.014.013c-1.955 1.955-1.955 5.123 0 7.077s5.123 1.954 7.078 0l.013-.014.001.001 4.365-4.364-1.015-1.014-4.365 4.363-.013.013c-1.392 1.392-3.656 1.392-5.048 0a3.572 3.572 0 01.014-5.06l-.001-.001L9.39 2.065c.839-.84 2.205-.84 3.045 0s.839 2.205 0 3.044l-6.09 6.089a.718.718 0 01-1.015-1.014l5.075-5.075z"
                  />
                </svg>
              </span>
              Add a Document
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCustomer;
