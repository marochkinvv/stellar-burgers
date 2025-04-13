import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  bunSelector,
  clearConstructor,
  createOrder,
  getConstructor,
  ingredientsSelector,
  orderRequestSelector
} from '../../slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import { isAuthSelector } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderModal, setOrderModal] = useState<null | TOrder>(null);

  const constructorItems = {
    bun: useSelector(bunSelector),
    ingredients: useSelector(ingredientsSelector)
  };

  const currentConstructor = useSelector(getConstructor);
  const isAuthenticated = useSelector(isAuthSelector);
  const orderRequest = useSelector(orderRequestSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    dispatch(createOrder(currentConstructor))
      .unwrap()
      .then((data) => {
        setOrderModal(data.order);
      })
      .catch((error) => {
        console.error('Ошибка при создании заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    setOrderModal(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModal}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
