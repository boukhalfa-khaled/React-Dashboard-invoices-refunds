import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../components/Tables/UsersTable';
import DefaultLayout from '../layout/DefaultLayout';

const Services  = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Services" />

      <div className="flex flex-col gap-10">
        <UsersTable/>
      </div>
    </DefaultLayout>
  );
};

export default Services;
