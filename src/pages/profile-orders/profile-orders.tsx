import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, loading, ordersSelector } from '../../slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const ordersIsLoading = useSelector(loading);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersSelector);

  if (ordersIsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
