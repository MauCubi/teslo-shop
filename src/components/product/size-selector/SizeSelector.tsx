import clsx from 'clsx';
import { ValidSizes } from '../../../app/interfaces/product-interface';

interface Props {
    selectedSize?: ValidSizes;
    availableSizes: ValidSizes[];
    onSelectedSize: ( size: ValidSizes ) => void;
}

export const SizeSelector = ({selectedSize, availableSizes, onSelectedSize}: Props) => {



  return (
    <div className='my-5'>
        <h3 className='font-bold mb-4'>Tallas disponibles</h3>

        <div className='flex'>
            {
                availableSizes.map( size => (
                    <button
                        key={size}
                        onClick={ () => onSelectedSize(size) } 
                        className={
                            clsx(
                                'mx-2 hover:underline cursor-pointer text-lg',
                                {
                                    'underline': size === selectedSize
                                }
                            )
                        }>
                        { size }
                    </button>
                ))
            }
        </div>

    </div>
  )
}
