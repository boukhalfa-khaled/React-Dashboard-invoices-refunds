import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SERVICES_URL = 'services'

const ServicesTable = () => {
  
  const [services, setServices] = useState([]); const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () => {
        try {
            const response = await axiosPrivate.get(SERVICES_URL, {
                signal: controller.signal
            });
            console.log(response.data);
            setServices(Array.from(response.data));
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


const handleDelete = async (id, ServiceName) => {
  try {
    const response = await axiosPrivate.delete(`${SERVICES_URL}/${id}`, 
    {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    }
    );
     if (response.status === 204) {
      setSuccessMsg(`service:  ${ServiceName} deleted successfully.`);
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
      {!errMsg ? '' :
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
              <h5 className=" font-semibold text-[#B45454]">
                {errMsg}
              </h5>
            </div>
          </div>}
          {!successMsg ? '' :  <div className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-4 mb-3">
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
          </div>}

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                title
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                description
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                price
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                stock
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {service.title}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{service.description}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{service.price}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {service.stock}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      to={`/edit-service/${service.id}`}
                      className="inline-flex items-center justify-center bg-orange-600 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-2"
                    >
                      Edite
                    </Link>
                    <button
                    onClick={()=> handleDelete(service.id, service.title)}
                      
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

export default ServicesTable;
