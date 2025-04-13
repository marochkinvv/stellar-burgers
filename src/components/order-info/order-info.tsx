import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { setIngredients } from '../../slices/ingredientsSlice';
import { useLocation } from 'react-router-dom';
import { getOrderById, orderByIdSelector } from '../../slices/ordersSlice';
import { AppDispatch } from 'src/services/store';

export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  /** TODO: взять переменные orderData и ingredients из стора */

  const orderNumber = Number(location.pathname.split('/').pop());

  useEffect(() => {
    dispatch(getOrderById(orderNumber));
  }, [dispatch, orderNumber]);

  const orderData = useSelector(orderByIdSelector);

  const ingredients = useSelector(setIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
