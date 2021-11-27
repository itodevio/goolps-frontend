import React, { useEffect } from "react";
import Modal from "components/Modal";
import { useFormik } from "formik";
import { TextInput, Select, Button } from "grommet";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { StoredUser, User } from "interfaces/User.interface";
import UserService from "services/User.service";

interface EditUserModalProps {
  user: StoredUser;
  visible: boolean;
  toggle: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
  const { user, visible, toggle } = props;

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  useEffect(() => {
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
    });
  }, [user]);

  const queryClient = useQueryClient();
  const updateIngredientMutation = useMutation(
    "updateIngredientMutation",
    (ingredient: StoredUser) => UserService.update(ingredient),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("usersQuery", (oldData: StoredUser[]) => {
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

  const onFormSubmit = (values: User) => {
    const userToUpdate = { _id: user._id, ...values };
    toast.promise(updateIngredientMutation.mutateAsync(userToUpdate), {
      loading: "Carregando...",
      success: "Usuário atualizado com sucesso",
      error: "Erro ao atualizar Usuário",
    });
  };

  return (
    <Modal
      title="Editar Usuário"
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
            id="firstName"
            name="firstName"
            placeholder="Nome"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <TextInput
            id="lastName"
            name="lastName"
            placeholder="Sobrenome"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          <TextInput
            id="email"
            name="email"
            placeholder="E-mail"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextInput
            id="password"
            name="password"
            placeholder="Senha"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Select
            id="unit"
            name="role"
            defaultValue="REGISTERED"
            options={["REGISTERED", "ADMIN"]}
            onChange={formik.handleChange}
            value={formik.values.role}
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

export default EditUserModal;
