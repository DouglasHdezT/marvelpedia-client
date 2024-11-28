import PrivateRoute from "../../../../layouts/PrivateRoute/PrivateRoute";
import { Button, Flex, Form, Input, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {  useEffect, useState } from "react";
import { useLoadingContext } from "../../../../contexts/LoadingContext";
import { findHistoryByUser } from "../../../../services/CatalogsService";
import { toast } from "react-toastify";


const Columns = [
  {title: "Data Model", dataIndex: "model"},
  {title: "Type", dataIndex: "type"},
  {title: "Search", dataIndex: "search"},
  {title: "Limit", dataIndex: "limit"},
  {title: "Offset", dataIndex: "offset"},
  {title: "Timestamp", dataIndex: "timestamp"},
  {title: "User", dataIndex: "user"},
]

const HistoryByUserPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const { startLoading, stopLoading } = useLoadingContext();
  const [items, setItems] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    startLoading();
    console.log('Finish:', values);
    
    const _items = await findHistoryByUser(values.search);
    if(_items === null) {
      toast("History not found", { type: 'warning' }); 
      stopLoading();
      return;
    }

    setItems(_items)
    stopLoading();
  };

  const itemsToShow = items.map(_item => ({
    ..._item,
    key: _item.id,
    user: _item.user.email
  }))

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0

  return (
    <PrivateRoute>
      <section className="w-full p-6 flex flex-col gap-4">
        <h1 className="text-center font-montserrat font-bold"> Search History by User </h1>
        <Form className="self-center" form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
              name="search"
              rules={[
                {
                  required: true,
                  message: 'Please input email name!',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !clientReady ||
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  Search
                </Button>
              )}
            </Form.Item>
          </Form>
      </section>

      {
        items && items.length > 0 &&
        (
          <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
            </Flex>
            <Table rowSelection={rowSelection} columns={Columns} dataSource={itemsToShow} />
          </Flex>
        )
      }
      
    </PrivateRoute>
  );
}

export default HistoryByUserPage;