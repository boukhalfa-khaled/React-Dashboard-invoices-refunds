import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const USERS_URL = 'users';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };


const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () => {
        try {
            const response = await axiosPrivate.get(USERS_URL, {
                signal: controller.signal
            });
            console.log(response.data);
            let  userss = Array.from(response.data);
            setUsers(userss);
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

    getProfile();

    return () => {
        isMounted = false;
        controller.abort();
    }
}, []);




  
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Role
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              date_joined
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              extraField
            </h5>
          </div>
        </div>

        {users.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === users.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              {/* <div className="flex-shrink-0">
                <img src={user.logo} alt="Brand" />
              </div> */}
              <p className="hidden text-black dark:text-white sm:block">
                {user.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.email}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{user.id}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{formatDate(user.date_joined)}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">extraField</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
