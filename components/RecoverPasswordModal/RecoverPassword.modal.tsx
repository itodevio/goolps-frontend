import React, { useState } from "react";
import { Alert, Form, Input } from "antd";
import app from "connection/firebase.connection";
import Modal from "components/Modal";
import { Button } from "grommet";

interface ResetPasswordModalProps {
  isVisible: boolean;
  toggleModal: () => void;
}

export interface ResetPasswordForm {
  email: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = (props) => {
  const { isVisible, toggleModal } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [resetError, setResetError] = useState("");

  const resetPassword = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    setEmailSent(false);
    try {
      await app.auth().sendPasswordResetEmail(data.email);
      setEmailSent(true);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        setResetError("Este email não existe");
      } else if (errorCode === "auth/invalid-email") {
        setResetError("Este email é invalido");
      }
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Redefinir senha"
      width={680}
      visible={isVisible}
      onCancel={toggleModal}
      afterClose={() => {
        setIsLoading(false);
        setEmailSent(false);
        setResetError("");
      }}
    >
      {emailSent ? (
        <div className="mb-6">
          <Alert message="Email enviado! verifique seu email." type="info" showIcon closable />
        </div>
      ) : (
        <p className="mb-6">Enviaremos um email com as instruções de redefinição de senha.</p>
      )}
      {resetError !== "" && (
        <div className="mb-6">
          <Alert message={resetError} type="warning" showIcon closable />
        </div>
      )}
      <Form
        name="LoginForm"
        className="login-form mb-10"
        layout="vertical"
        initialValues={{
          email: "",
          password: "",
        }}
        onFinish={resetPassword}
      >
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input className="input" disabled={isLoading} />
        </Form.Item>
        <Button
          primary
          label="Redefinir senha"
          type="submit"
          disabled={emailSent}
          className="w-full d-block"
        />
      </Form>
    </Modal>
  );
};

export default ResetPasswordModal;
