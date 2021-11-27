import Modal from "components/Modal";
import { useFormik } from "formik";
import { TextInput, Select, Button } from "grommet";
import { User, UserRole } from "interfaces/User.interface";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import UserService from "services/User.service";

interface NewUserModalProps {
  visible: boolean;
  toggle: () => void;
}

const NewUserModal: React.FC<NewUserModalProps> = (props) => {
  const { visible, toggle } = props;

  const queryClient = useQueryClient();
  const userUserMutation = useMutation(
    "userUserMutation",
    (user: User) => UserService.store(user),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<any>("usersQuery", (oldData: any) => {
          return [...oldData, data];
        });
        toggle();
      },
    }
  );

  const onFormSubmit = (values: User) => {
    toast.promise(userUserMutation.mutateAsync(values), {
      loading: "Carregando...",
      success: "Usuário cadastrado com sucesso",
      error: "Erro ao cadastrar usuário",
    });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "REGISTERED" as UserRole,
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  useEffect(() => {
    formik.setFieldValue("lotNumber", Math.floor(1000 + Math.random() * 9000));
  }, [visible]);

  return (
    <Modal
      title="Cadastrar usuário"
      width={1024}
      visible={visible}
      onCancel={toggle}
      afterClose={() => {
        userUserMutation.reset();
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
          <Button type="submit" primary label="CRIAR" />
        </div>
      </form>
    </Modal>
  );
};

export default NewUserModal;
