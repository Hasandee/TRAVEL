import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { getUsers, createUser, updateUser, deleteUser } from "../userService.js";
import "../Styles/UserManagement.css";
import { useNavigate } from "react-router-dom"; // Import for navigation

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      alert("Failed to load users.");
    }
  };

  const handleAddOrEditUser = async (values) => {
    try {
      if (currentUser) {
        await updateUser(currentUser._id, values);
        alert("User edited successfully!");
      } else {
        await createUser(values);
        alert("User added successfully!");
      }
      setModalVisible(false);
      loadUsers();
    } catch (error) {
      alert("Error saving user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      alert("User deleted successfully!");
      loadUsers();
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const showModal = (user = null) => {
    setCurrentUser(user);
    form.setFieldsValue(user || { name: "", email: "", role: "user" });
    setModalVisible(true);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button className="edit-button" onClick={() => showModal(record)}>Edit</Button>
          <Button className="delete-button" onClick={() => handleDeleteUser(record._id)}>Delete</Button>
        </>
      ),
    }
  ];

  return (
    <div className="user-management-container">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/adminProfile")}>⬅ Back</button>

      <div className="user-management-header">
        <h2 className="user-management-title">User Management</h2>
        <Button className="user-management-button" type="primary" onClick={() => showModal()}>Add User</Button>
      </div>

      <Table className="user-management-table" columns={columns} dataSource={users} rowKey="_id" />

      <Modal
        title={currentUser ? "Edit User" : "Add User"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        className="user-management-modal"
      >
        <Form form={form} onFinish={handleAddOrEditUser}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select>
              <Select.Option value="user">User</Select.Option>
              <Select.Option value="admin">Admin</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
