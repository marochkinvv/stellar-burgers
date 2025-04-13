import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { setIngredients } from '../../slices/ingredientsSlice';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const ingredientId = location.pathname.split('/').pop();
  const ingredients = useSelector(setIngredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
