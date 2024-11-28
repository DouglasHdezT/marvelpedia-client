import { useState } from "react";
import SeriesModal from "./SeriesModal";

const SeriesLayout = ({ pagination, items, onMore }) => {
  const [selected, setSelected] = useState(undefined);
  const [isOpen, setisOpen] = useState(undefined);
  
  return(
    <>
      <section className="w-full flex flex-wrap gap-4 justify-center">
        {
          items.map(c => (
            <article onClick={() => {setSelected(c); setisOpen(true)}}
              className="w-[300px] h-[550px] flex flex-col overflow-hidden rounded bg-[crimson] text-white cursor-pointer" key={c.id}>
              <img className="w-[300px] h-[450px] object-cover" 
                src={`${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`} />
              <p className="text-center flex-1 flex justify-center items-center">
                {c.id} - {c.title}
              </p>
            </article>
          ))
        }
      </section>
      {
        pagination.offset + pagination.limit <= pagination.total && 
        <button onClick={()=> {onMore()}}
          className="bg-[crimson] p-6 text-white font-montserrat text-xl self-center rounded mt-4">
          load more...
        </button>
      }
      <SeriesModal series={selected} isOpen={isOpen} onClick={() => {setisOpen(false)}} />
    </>
  );
}

export default SeriesLayout;