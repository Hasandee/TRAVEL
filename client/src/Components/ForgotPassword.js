import React, { useState } from "react";
import { Form, Input, Button, Typography, Alert, Card } from "antd";
import { Link } from "react-router-dom";
import useUserLogin from "../Hooks/userLogin";
import "../Styles/Register.css";

const ForgotPassword = () => {
  const { error, loading, forgotPassword } = useUserLogin();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    await forgotPassword(values.email);
    setSubmitted(true);
  };

  return (
    <div className="register-page">
      <Card className="registerform-container">
        <div className="registerform-section">
          <Typography.Title level={3} strong className="registertitle">
            Forgot Password
          </Typography.Title>
          <Typography.Text type="secondary" className="slogan">
            Enter your email to receive a password reset link.
          </Typography.Text>

          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Enter a valid email!" },
              ]}
            >
              <Input size="large" placeholder="Enter Your Email" />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}

            {submitted && (
              <Alert
                description="If your email is registered, you will receive a reset link shortly."
                type="success"
                showIcon
                className="alert"
              />
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/login">
                <Typography.Text type="secondary">Back to Login</Typography.Text>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
