import { Modal } from "antd";
import { useEffect, useState } from "react";

import { useLoadingContext } from "../../contexts/LoadingContext";
import { findComicsByCharacter } from "../../services/CatalogsService";
import { toast } from "react-toastify";

const CharacterModal = ({ character, isOpen, onClick }) => {
  const [comics, setComics] = useState([]);
  const [pagination, setPagination] = useState(undefined);
  const { startLoading, stopLoading } = useLoadingContext();

  useEffect(() => {
    if(character) {
      fetchComics(character.id, 0);
    }
  }, [character]);

  const fetchComics = async (id, offset) => {
    startLoading();

    const _data = await findComicsByCharacter(id, offset, 10);
    if(_data) {
      setPagination(_data);
      if(offset === 0) {
        setComics(_data.results)
      } else {
        setComics([...comics, ..._data.results]);
      }
    } else {
      toast("Comics not found", {type: "warning"});
    }
    
    stopLoading();
  }

  if(!character) {
    return <></>;
  }
  
  return (
    <Modal width={600} title={character.name} open={isOpen} onOk={()=> onClick()}> 
      <div className="w-full flex gap-4">
        <img className="w-[200px] object-cover"
          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}/>
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-2xl font-montserrat"> {character.name} </h1>
          <p className="text-lg font-roboto"> {character.description} </p>
        </div>
      </div>
      {
        pagination && (
          <div className="w-full flex flex-col gap-2 items-center">
            <h2 className="font-montserrat"> Related comics </h2>
            <div className="w-full overflow-x-auto flex gap-4">
              {
                comics.map(c => (
                  <article className="w-[400px] h-[450px] shrink-0 bg-[crimson] flex text-white" key={c.id}>
                    <img className="w-[200px] h-[450px] object-cover"
                      src={`${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`}/>
                    <p className="flex-1 p-2 flex justify-center items-center">
                      {c.id} - {c.title}
                    </p>
                  </article>
                ))
              }

              {
                pagination.offset + pagination.limit <= pagination.total &&
                <button onClick={() => fetchComics(character.id, pagination.offset + pagination.limit)} 
                  className="w-[200px] h-[450pxpx] bg-[crimson] p-4 text-white flex justify-center items-center">
                  Load more...
                </button>
              }
            </div>
          </div>
        )
      }
    </Modal>
  )
}

export default CharacterModal;