import { titleFont } from '@/app/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function () {
  return (
    <main className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>
      <LoginForm />
    </main>
  );
}
