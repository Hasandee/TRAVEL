import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { getUsers, createUser, updateUser, deleteUser } from "../userService.js";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      console.log("Users loaded:", data); // Debugging
      setUsers(data);
    } catch (error) {
      message.error("Failed to load users.");
    }
  };

  const handleAddOrEditUser = async (values) => {
    console.log("Submitting user data:", values); // Debugging
    try {
      if (currentUser) {
        await updateUser(currentUser._id, values);
        message.success("User updated successfully!");
      } else {
        await createUser(values);
        message.success("User added successfully!");
      }
      setModalVisible(false);
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error.response?.data || error.message);
      message.error("Error saving user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      message.success("User deleted!");
      loadUsers();
    } catch (error) {
      message.error("Failed to delete user.");
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
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button danger onClick={() => handleDeleteUser(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => showModal()}>Add User</Button>
      <Table columns={columns} dataSource={users} rowKey="_id" />

      <Modal
        title={currentUser ? "Edit User" : "Add User"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEditUser}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="password" rules={[{ required: true, type: "password" }]}>
            <Input />
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
