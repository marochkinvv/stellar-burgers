import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { setIngredients } from '../../slices/ingredientsSlice';
import { useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  // const ingredientData = null;
  const location = useLocation();
  const ingredientData = useSelector(setIngredients).find((i) =>
    location.pathname.includes(i._id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
