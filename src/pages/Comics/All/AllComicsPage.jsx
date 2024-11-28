import PrivateRoute from "../../../layouts/PrivateRoute/PrivateRoute";
import { useEffect, useState } from "react";
import {findAllComics } from "../../../services/CatalogsService";
import { toast } from "react-toastify";
import { useLoadingContext } from "../../../contexts/LoadingContext";
import ComicsLayout from "./ComicsLayout";


const AllComicsPage = () => {
  const [pagination, setPagination] = useState(undefined);
  const [items, setItems] = useState([]);

  const { startLoading, stopLoading } = useLoadingContext();

  useEffect(() => {
    onMore();
  }, []);

  const onMore = async () => {
    startLoading();
    const _offset = pagination ? pagination.offset + pagination.limit : 0;
    
    const _data = await findAllComics(_offset, 30);

    if(_data) {
      setPagination(_data);
      setItems([...items, ..._data.results]);
    } else {
      toast("Chracters not found", {type: "warning"})
    }
    stopLoading();
  }

  return(
    <PrivateRoute>
      <section className="w-full p-6 flex flex-col gap-4">
        <h1 className="text-center font-montserrat font-bold"> All Comics </h1>
      </section>
      {
        pagination && <ComicsLayout pagination={pagination} items={items} onMore={onMore}/>
      }
    </PrivateRoute>
    );
}

export default AllComicsPage;