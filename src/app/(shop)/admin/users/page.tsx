// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';
import { UserTable } from './ui/UserTable';
import { getPaginatedUsers } from '@/actions/users/get-paginated-users';

export default async function() {

  const { ok, users = []} = await getPaginatedUsers();

  if (!ok) {
    redirect('/auth/login');
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UserTable users={ users } />
      </div>
    </>
  );
}