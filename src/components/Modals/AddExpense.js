import { DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";
import Button from "../Button";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancel,
  onFinish,
}) {
  console.log(isExpenseModalVisible, "abc");
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        style={{ fontWeight: 600 }}
        title="Add Expense"
        visible={isExpenseModalVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "expense");
            form.resetFields();
          }}
        >
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the name of the transaction!",
              },
            ]}
          >
            <Input type="text" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input the expense amount!",
              },
            ]}
          >
            <Input type="number" className="custom-input" />
          </Form.Item>
          <Form.Item
            style={{ fontWeight: 600 }}
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input the expense date!",
              },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" className="custom-input" />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tag"
            style={{ fontWeight: 600 }}
            rules={[{ required: true, message: "Please select a tag!" }]}
          >
            <Select className="select-input-2">
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="office">Vacation</Select.Option>
              <Select.Option value="office">
                Entertainment & Miscellaneous
              </Select.Option>
              <Select.Option value="office">Rent </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="btn btn-blue" type="primary" htmlType="submit">
              Add Expense
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddExpenseModal;
