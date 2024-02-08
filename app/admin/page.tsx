// import { auth, signOut } from 'app/auth';
import { DataTable } from './data-table';

export default async function ProtectedPage() {
  // let session = await auth();

  return (
    <div className="flex container">
      <DataTable />
    </div>
  );
}
