import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../components/Tables/UsersTable';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <UsersTable />
      </div>
    </DefaultLayout>
  );
};

export default Users;
