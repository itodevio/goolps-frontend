import React, { useEffect } from "react";
import Modal from "components/Modal";
import { useFormik } from "formik";
import { TextInput, Select, TextArea, Button } from "grommet";
import { Ingredient, StoredIngredient } from "interfaces/Ingredient";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import IngredientService from "services/Ingredient.service";

interface EditIngredientModalProps {
  ingredient: StoredIngredient;
  visible: boolean;
  toggle: () => void;
}

const EditIngredientModal: React.FC<EditIngredientModalProps> = (props) => {
  const { ingredient, visible, toggle } = props;

  const formik = useFormik({
    initialValues: {
      name: ingredient.name,
      qtt: ingredient.qtt,
      unit: ingredient.unit,
      lotNumber: ingredient.lotNumber,
      description: ingredient.description,
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  useEffect(() => {
    formik.setValues({
      name: ingredient.name,
      qtt: ingredient.qtt,
      unit: ingredient.unit,
      lotNumber: ingredient.lotNumber,
      description: ingredient.description,
    });
  }, [ingredient]);

  const queryClient = useQueryClient();
  const updateIngredientMutation = useMutation(
    "updateIngredientMutation",
    (ingredient: StoredIngredient) => IngredientService.update(ingredient),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("ingredientsQuery", (oldData: StoredIngredient[]) => {
          return oldData.map((oldIngredient) => {
            if (oldIngredient._id === data._id) return data;
            return oldIngredient;
          });
        });
        formik.resetForm();
        toggle();
      },
    }
  );

  const onFormSubmit = (values: Ingredient) => {
    const ingredientToUpdate = { _id: ingredient._id, ...values };
    toast.promise(updateIngredientMutation.mutateAsync(ingredientToUpdate), {
      loading: "Carregando...",
      success: "Ingrediente atualizado com sucesso",
      error: "Erro ao atualizar Ingrediente",
    });
  };

  return (
    <Modal
      title="Editar ingrediente"
      width={1024}
      visible={visible}
      onCancel={toggle}
      afterClose={() => {
        updateIngredientMutation.reset();
        formik.resetForm();
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-4">
          <TextInput
            id="name"
            name="name"
            placeholder="Nome do ingrediente"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <div className="flex gap-4">
            <TextInput
              id="qtt"
              name="qtt"
              placeholder="Quantidade"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.qtt}
            />
            <Select
              id="unit"
              name="unit"
              options={["g", "kg", "unt", "L", "ml"]}
              onChange={formik.handleChange}
              value={formik.values.unit}
            />
            <TextInput
              id="lotNumber"
              readOnly
              name="lotNumber"
              placeholder="Lote"
              onChange={formik.handleChange}
              value={formik.values.lotNumber}
            />
          </div>
          <TextArea
            id="description"
            name="description"
            placeholder="Descrição"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button secondary label="CANCELAR" onClick={toggle} />
          <Button type="submit" primary label="EDITAR" />
        </div>
      </form>
    </Modal>
  );
};

export default EditIngredientModal;
