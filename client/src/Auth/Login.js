import React from 'react';
import { Button, Card, Form, Typography, Input, Alert } from 'antd';
import { Link } from 'react-router-dom';
import '../Styles/Register.css';
import loginImg from '../Assests/test14.jpg';

const Login = () => {
  const handleLogin = async (values)=>{
    console.log(values);
  }
  return (
    <div className="register-page">
    <Card className="form-container">
      <div className="form-content">
         {/* Image Section */}
         <div className="image-section">
          <img src={loginImg} alt="Register" className="auth-image" />
        </div>
        {/* Form Section */}
        <div className="form-section">
          <Typography.Title level={3} strong className="title">
            Sign In
          </Typography.Title>
          <Typography.Text type="secondary" className="slogan">
            Unlock Your World.
          </Typography.Text>
          <Form
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
          >
         

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
               Sign In
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/register">
                <Button size="large" className="btn">
                  Create an  Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>

       
      </div>
    </Card>
  </div>
);
};

export default Login;

