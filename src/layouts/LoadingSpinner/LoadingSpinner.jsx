import { Spin } from "antd";

import { useLoadingContext } from "../../contexts/LoadingContext";

const LoadingSpinner = () => {
  const { loading } = useLoadingContext();
  
  return (
    <>
      {
        loading &&
          <section className="fixed inset-0 bg-[#00000088] select-none flex items-center justify-center">
            <Spin size="large" />
          </section>
      }
    </>
  );  
}

export default LoadingSpinner;