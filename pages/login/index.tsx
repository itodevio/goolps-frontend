import { useFormik } from "formik";
import { Button, Heading, TextInput } from "grommet";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import GoolpsLogo from "public/goolps-logo.svg";
import Image from "next/image";
import app from "connection/firebase.connection";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import AuthService from "services/Auth.service";
import { useRouter } from "next/router";
import { AppContext } from "context/app.context";
import { LoadingOutlined } from "@ant-design/icons";
import ResetPasswordModal from "components/RecoverPasswordModal/RecoverPassword.modal";

const LoginContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem;
`;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsEntering } = useContext(AppContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => onFormSubmit(values),
  });

  const loginMutation = useMutation(
    "loginMutation",
    ({ email, password, token }: { email: string; password: string; token: string }) =>
      AuthService.login({ email, password, token }),
    {
      onSuccess(user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        router.push("/ingredients");
        setIsEntering(false);
      },
      onError() {
        setIsLoading(false);
      },
    }
  );

  const onFormSubmit = async (values) => {
    setIsEntering(true);
    setIsLoading(true);
    const firebaseAuth = app.auth();
    try {
      const credentials = await firebaseAuth.signInWithEmailAndPassword(
        values.email,
        values.password
      );
      if (credentials && credentials.user) {
        localStorage.setItem("cred", JSON.stringify(await credentials.user.getIdToken(true)));
        toast.promise(
          loginMutation.mutateAsync({
            email: values.email,
            password: values.password,
            token: await credentials.user.getIdToken(true),
          }),
          {
            loading: "Carregando...",
            success: "Login realizado com sucesso!",
            error: "Erro ao realizar login :(",
          }
        );
      }
    } catch (error) {
      await firebaseAuth.signOut();
      setIsLoading(false);
    }
  };

  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
  const toggleResetPassword = () => setIsResetPasswordVisible(!isResetPasswordVisible);

  return (
    <>
      <ResetPasswordModal isVisible={isResetPasswordVisible} toggleModal={toggleResetPassword} />
      <Image src={GoolpsLogo} />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingOutlined style={{ fontSize: 46, color: "rgb(125, 76, 219)" }} spin />
        </div>
      ) : (
        <LoginContainer>
          <Heading level="3">Login</Heading>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
            action="POST"
          >
            <TextInput
              id="email"
              name="email"
              placeholder="E-mail"
              type="string"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextInput
              id="password"
              name="password"
              placeholder="Senha"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="flex justify-end">
              <p className="text-right">Esqueceu a senha?&nbsp;</p>
              <span className="cursor-pointer" style={{ fontWeight: "bold" }} onClick={toggleResetPassword}>
                clique aqui!
              </span>
            </div>
            <Button type="submit" primary label="Login" />
          </form>
        </LoginContainer>
      )}
    </>
  );
};

export default Login;
