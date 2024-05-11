import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import InvoicesTable from '../components/Tables/InvoicesTable';
import DefaultLayout from '../layout/DefaultLayout';

const Invoices = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoices" />

      <div className="flex flex-col gap-10">
        <InvoicesTable/>
      </div>
    </DefaultLayout>
  );
};

export default Invoices;
