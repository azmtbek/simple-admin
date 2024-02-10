import { auth, signOut } from 'app/auth';
import { deleteUserWithId, getAllUser, getUserByEmail, updateUserStatus } from '../../schema/db';
import { DataTable, type UserData } from './data-table';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  let session = await auth();
  const users: UserData[] = await getAllUser();
  async function blockUsers(userIds: number[]) {
    "use server";
    try {
      for (const id of userIds) {
        await updateUserStatus(id, 'blocked');
      }
    } catch (e) {
      console.log(e);
    }

  };
  async function unblockUsers(userIds: number[]) {
    "use server";
    try {
      for (const id of userIds) {
        await updateUserStatus(id, 'active');
      }
    } catch (e) {
      console.log(e);
    }
  };
  async function deleteUsers(userIds: number[]) {
    "use server";
    try {
      const user = await getUserByEmail(session?.user?.email || '');

      for (const id of userIds) {
        await deleteUserWithId(id);
      }
      if (userIds.includes(user[0].id)) await signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex container">
      <DataTable
        users={users}
        blockUsers={blockUsers}
        unblockUsers={unblockUsers}
        deleteUsers={deleteUsers}
      />
    </div>
  );
}
