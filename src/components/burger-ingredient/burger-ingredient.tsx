import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  ingredientCountsSelector
} from '../../slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredientCounts = useSelector(ingredientCountsSelector);

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={ingredientCounts[ingredient._id] || null}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
