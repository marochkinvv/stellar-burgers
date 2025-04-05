import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from 'react-redux';
import {
  feedsSelector,
  totalFeedsSelector,
  totalTodayFeedsSelector
} from '../../slices/feedsSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(feedsSelector);

  /** TODO: взять переменные из стора */

  const feed = {
    total: useSelector(totalFeedsSelector),
    totalToday: useSelector(totalTodayFeedsSelector)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
