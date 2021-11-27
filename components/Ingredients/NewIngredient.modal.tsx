import Modal from "components/Modal";
import { useFormik } from "formik";
import { TextInput, Select, TextArea, Button } from "grommet";
import { Ingredient } from "interfaces/Ingredient.interface";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import IngredientService from "services/Ingredient.service";

interface NewIngredientModalProps {
  visible: boolean;
  toggle: () => void;
}

const NewIngredientModal: React.FC<NewIngredientModalProps> = (props) => {
  const { visible, toggle } = props;

  const queryClient = useQueryClient();
  const newIngredientMutation = useMutation(
    "newIngredientMutation",
    (ingredient: Ingredient) => IngredientService.store(ingredient),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<any>("ingredientsQuery", (oldData: any) => {
          return [...oldData, data];
        });
        toggle();
      },
    }
  );

  const onFormSubmit = (values: Ingredient) => {
    toast.promise(newIngredientMutation.mutateAsync(values), {
      loading: "Carregando...",
      success: "Ingrediente cadastrado com sucesso",
      error: "Erro ao cadastrar Ingrediente",
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      qtt: 0,
      unit: "g",
      lotNumber: 0,
      description: "",
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  useEffect(() => {
    formik.setFieldValue("lotNumber", Math.floor(1000 + Math.random() * 9000));
  }, [visible]);

  return (
    <Modal
      title="Cadastrar ingrediente"
      width={1024}
      visible={visible}
      onCancel={toggle}
      afterClose={() => {
        newIngredientMutation.reset();
        formik.resetForm();
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        action="POST"
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
          <Button type="submit" primary label="CRIAR" />
        </div>
      </form>
    </Modal>
  );
};

export default NewIngredientModal;
