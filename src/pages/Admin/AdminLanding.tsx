import { useMemo } from 'react';
import LayoutDashboard from './Layout';
import { DataTable } from '@rsces/components/DataTable';
const dummyData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jane Doe',
    role: 'User',
  },
];

const AdminLanding = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessorKey: 'id',
      },
      {
        Header: 'Name',
        accessorKey: 'name',
      },
      {
        Header: 'Role',
        accessorKey: 'role',
      },
    ],
    [],
  );
  return (
    <LayoutDashboard>
      <DataTable columns={columns} data={dummyData ?? []} />
    </LayoutDashboard>
  );
};

export default AdminLanding;
