'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { setTransactionId } from '@/actions/payments/set-transaction-id';
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payment';

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div>
        <div className='animate-pulse'>
          <div className='h-11 bg-gray-300 rounded' />
          <div className='h-11 bg-gray-300 rounded mt-4' />
        </div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {            
            value: roundedAmount.toString(),
            currency_code: 'USD',
          },
        },
      ],
    });

    const result = await setTransactionId(orderId, transactionId)

    if (!result.ok) {
      throw new Error('Error al realizar transaccion')
    }
    
    return transactionId;
  };


  const onApprove = async(data: OnApproveData, actions: OnApproveActions) => {

    console.log('onApprove')

    const details = await actions.order?.capture();

    if (!details) {
      return;
    }

    await paypalCheckPayment( details.id as string );

  }

  return <div className='relative z-1'><PayPalButtons createOrder={createOrder} onApprove={ onApprove }/></div>
};
