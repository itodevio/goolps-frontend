import React from "react";
import { useFormik } from "formik";
import { Button, Select, TextArea, TextInput } from "grommet";
import styles from "./NewIngredientTab.module.scss";
import { useMutation } from "react-query";
import { Ingredient } from "interfaces/Ingredient";
import IngredientService from "services/Ingredient.service";
import toast from "react-hot-toast";

const NewIngredientTab = () => {
  const newIngredientMutation = useMutation("newIngredientMutation", (ingredient: Ingredient) =>
    IngredientService.store(ingredient)
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
      lotNumber: Math.floor(1000 + Math.random() * 9000),
      description: "",
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className={styles.NewIngredientTab}
        action="POST"
      >
        <TextInput
          id="name"
          name="name"
          placeholder="Nome do ingrediente"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <div className={styles.inputContainer}>
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
        <Button type="submit" primary label="CRIAR" />
      </form>
    </>
  );
};

export default NewIngredientTab;
