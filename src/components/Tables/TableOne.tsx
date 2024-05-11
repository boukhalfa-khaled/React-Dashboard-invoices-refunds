import { USER } from '../../types/user';

const userData: USER[] = [
  {
    name: 'khaled',
    email: 'khaled@email.com',
    role: 'Developer',
    created_at: `Jan 13,2023`,
    extraField: 10,
  },
  {
    name: 'khaled',
    email: 'khaled@email.com',
    role: 'Developer',
    created_at: `Jan 13,2023`,
    extraField: 10,
  },
  {
    name: 'khaled',
    email: 'khaled@email.com',
    role: 'Developer',
    created_at: `Jan 13,2023`,
    extraField: 3.7,
  },
  {
    name: 'khaled',
    email: 'khaled@email.com',
    role: 'Developer',
    created_at: `Jan 13,2023`,
    extraField: 2.5,
  },
  {
    name: 'khaled',
    email: 'khaled@email.com',
    role: 'Developer',
    created_at: `Jan 13,2023`,
    extraField: 10,
  },
];

const TableOne = () => {
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
              created_at
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              extraField
            </h5>
          </div>
        </div>

        {userData.map((user, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === userData.length - 1
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
              <p className="text-meta-3">{user.role}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.created_at}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{user.extraField}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
