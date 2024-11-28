import PrivateRoute from "../../../../layouts/PrivateRoute/PrivateRoute";
import {  useEffect, useState } from "react";
import { useLoadingContext } from "../../../../contexts/LoadingContext";
import {  findHistoryInComics } from "../../../../services/CatalogsService";
import { toast } from "react-toastify";
import { Flex, Table } from "antd";


const Columns = [
  {title: "Data Model", dataIndex: "model"},
  {title: "Type", dataIndex: "type"},
  {title: "Search", dataIndex: "search"},
  {title: "Limit", dataIndex: "limit"},
  {title: "Offset", dataIndex: "offset"},
  {title: "Timestamp", dataIndex: "timestamp"},
  {title: "User", dataIndex: "user"},
]

const HistoryByComicsPage = () => {
  const { startLoading, stopLoading } = useLoadingContext();
  const [items, setItems] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


  useEffect(() => {
    onFinish();
  }, []);

  const onFinish = async () => {
    startLoading();
    
    const _items = await findHistoryInComics();
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
        <h1 className="text-center font-montserrat font-bold"> Search History of Comics </h1>
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

export default HistoryByComicsPage;