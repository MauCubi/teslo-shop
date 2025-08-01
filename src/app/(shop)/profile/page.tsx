import { auth } from '@/auth.config';
import { Title } from '@/components/ui/title/Title';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <div>
      <Title title='Perfil' />

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <h1 className='text-3xl mb-10'>{session.user.rol}</h1>

    </div>
  );
}
