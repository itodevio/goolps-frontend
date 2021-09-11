import { Ingredient } from "interfaces/Ingredient";
import { ApiClient } from "utils/apiClient";

const IngredientService = {
  async store(ingredient: Ingredient) {
    const { data } = await ApiClient.post(`/ingredients`, ingredient);
    return data;
  },
};

export default IngredientService;
