import { Button, Form, Input } from "antd";
import PrivateRoute from "../../../layouts/PrivateRoute/PrivateRoute";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {findComicsByName } from "../../../services/CatalogsService";
import { toast } from "react-toastify";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import ComicsLayout from "./ComicsLayout";


const CharactersByComicsPage = () => {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState(false);
  const [pagination, setPagination] = useState(undefined);
  const [items, setItems] = useState([]);
  const [offset,setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const { startLoading, stopLoading } = useLoadingContext();

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values) => {
    startLoading();
    console.log('Finish:', values);
    const _data = await findComicsByName(values.search, 0, 20);

    if(_data) {
      setPagination(_data);
      setItems(_data.results);
      setOffset(0);
      setSearch(values.search);
      toast("Characters found");
    } else {
      toast("Chracters not found", {type: "warning"})
    }
    stopLoading();
  };

  const onMore = async () => {
    startLoading();
    if(pagination.offset + pagination.limit <= pagination.total) {
      const _offset = offset + pagination.limit;
      const _data = await findComicsByName(search, _offset, 5);

      if(_data) {
        setPagination(_data);
        setItems([...items, ..._data.results]);
        setOffset(_offset);
      } else {
        toast("Chracters not found", {type: "warning"})
      }
      stopLoading();
    } 
  }

  return(
    <PrivateRoute>
      <section className="w-full p-6 flex flex-col gap-4">
        <h1 className="text-center font-montserrat font-bold"> Characters by comics </h1>
        <Form className="self-center" form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="search"
            rules={[
              {
                required: true,
                message: 'Please input comic name!',
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
        pagination && <ComicsLayout pagination={pagination} items={items} onMore={onMore}/>
      }
    </PrivateRoute>
    );
}

export default CharactersByComicsPage;