import { Title } from '@/components/ui/title/Title';
import Link from 'next/link';
import { AddresForm } from './ui/AddresForm';
import { getCountries } from '@/actions/countries/get-countries';
import { Country } from '@/app/interfaces/country-interface';

export default async function NamePage() {


  const countries = await getCountries();
 

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddresForm countries={ countries as Country[] } />

      </div>




    </div>
  );
}