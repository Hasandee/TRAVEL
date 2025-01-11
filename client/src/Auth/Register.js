import React from 'react';
import { Button, Card, Form, Typography, Input, Alert } from 'antd';
import { Link } from 'react-router-dom';
import '../Styles/Register.css';
import registerImg from '../Assests/test14.jpg';

const Register = () => {
  const handleRegister = (values) => {
    console.log(values);
  };

  return (
    <div className="register-page">
      <Card className="form-container">
        <div className="form-content">
          {/* Form Section */}
          <div className="form-section">
            <Typography.Title level={3} strong className="title">
              Create an Account
            </Typography.Title>
            <Typography.Text type="secondary" className="slogan">
              Join for exclusive access!
            </Typography.Text>
            <Form
              layout="vertical"
              onFinish={handleRegister}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your full name!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Full Name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'The input is not a valid email!',
                  },
                ]}
              >
                <Input size="large" placeholder="Enter Your Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Enter Your Password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter Your Password"
                />
              </Form.Item>
              {/* {error && (
                <Alert 
                description={error} 
                type='error' 
                showIcon 
                closable 
                className="alert"/>
              )} */}

              <Form.Item>
                <Button
                  //type={`${loading ? '' : 'primary'}`}
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  {/* {loading ? <Spin /> : 'Create Account' } */}
                  Create Account
                </Button>
              </Form.Item>

              <Form.Item>
                <Link to="/login">
                  <Button size="large" className="btn">
                    Sign In
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </div>

          {/* Image Section */}
          <div className="image-section">
            <img src={registerImg} alt="Register" className="auth-image" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
