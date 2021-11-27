import { Ingredient, StoredIngredient } from "interfaces/Ingredient.interface";
import { ApiClient } from "utils/apiClient";

const IngredientService = {
  async get() {
    const { data } = await ApiClient.get<StoredIngredient[]>(`/ingredients`);
    return data;
  },
  async store(ingredient: Ingredient) {
    const { data } = await ApiClient.post<StoredIngredient>(`/ingredients`, ingredient);
    return data;
  },
  async update(ingredient: StoredIngredient) {
    const { data } = await ApiClient.put<StoredIngredient>(
      `/ingredients/${ingredient._id}/update`,
      ingredient
    );
    return data;
  },
  async delete(ingredientId: string) {
    const { data } = await ApiClient.delete(`/ingredients/${ingredientId}/remove`);
    return data;
  },
};

export default IngredientService;
