import { Link } from 'react-router';
import { useUserContext } from './../../contexts/UserContext';

const IndexPage = () => {
  const { token, user } = useUserContext(); 

  console.log({token, user});
  
  
  return (
    <section className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-montserrat font-bold">
        Welcome to Marvelpedia!
      </h1>

      <h2 className="text-xl font-roboto">
        The biggest wiki about Marvel Universe.<br/>
        You should try one of our services c:
      </h2>

      {
        !token ? 
          <div className='flex flex-col gap-4'>
            <h2 className="text-xl font-roboto text-center">
              But first, let me know who you are?
            </h2>

            <div className='max-w-96 flex gap-2'>
              <Link to={"/auth/login"} className='flex-1 p-4 flex justify-center items-center rounded text-white font-montserrat bg-[crimson]'> Login </Link>
              <Link to={"/auth/register"} className='flex-1 p-4 flex justify-center items-center rounded text-white font-montserrat bg-green-900'> Register </Link>
            </div>  
          </div> : 
          <h2 className="text-lg font-roboto text-center">
            But first, let me know who... Oh its you, {user?.email} <br/>
            Happy to see you again <br/>
            Please select an option at the Navbar
          </h2>
      }
    </section>
  );
}

export default IndexPage;