import { Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

const { Header, Content, Footer, Sider } = Layout;

const menuItems = [
  {
    key: "b6b09725-0c89-4332-9dc8-6ea2d4a2b07b",
    label: "Characters",
    path: "/app/characters/",
    children: [
      {
        key: "49010e1c-2edd-4a1f-a009-f20075bac1ef",
        label: "By name",
        path: "/app/characters/by-name"
      },
      {
        key: "02588370-ba6b-49ed-afbe-46e28d3ae9a6",
        label: "By comic",
        path: "/app/characters/by-comic"
      },
      {
        key: "af38be99-5e7f-4124-b5a7-1fd6e7ae8b82",
        label: "By series",
        path: "/app/characters/by-series"
      }
    ]
  },
  {
    key: "6789ea50-bccd-457b-83bc-c2ca3553af40",
    label: "Comics",
    path: "/app/comics"
  },
  {
    key: "4e5155ea-1889-49bc-8682-10a50fa34bba",
    label: "History",
    path: "/app/history",
    children: [
      {
        key: "80b92d10-8301-42c4-a745-9b9f198d9ab3",
        label: "Own",
        path: "/app/history/own"
      },
      {
        key: "fe132309-4cd4-45f4-a168-02da92fde0d7",
        label: "By user",
        path: "/app/characters/by-user"
      },
      {
        key: "4798bf3a-aee7-4930-918b-b10027577cc0",
        label: "Comics search",
        path: "/app/characters/comics"
      }
    ]
  }
]

const MainLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const {token, logout} = useUserContext();

  const navigateToMenu = ({ key }) => {
    
    const item = menuItems.map(e => ([e, ...e.children??[]]))
      .flat()
      .filter((e) => e.key === key)[0];
    
    if(item) {
      navigate(item.path);
    }
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        {
          token && 
          <div onClick={()=> { logout() }} 
            className='bg-red-950 p-2 cursor-pointer flex justify-center items-center text-white'>
            <h1 className='text-lg font-montserrat'> Logout </h1>
          </div>
        }
        <Menu 
          theme="dark" 
          mode="inline" 
          onSelect={navigateToMenu}
          items={menuItems} />
      </Sider>
      <Layout>
        <Header className='flex flex-col h-20 items-center justify-center font-montserrat bg-[crimson] text-white'
          style={{
            padding: 16
          }}
        >
          <h1 className='font-bold text-3xl'> Marvelpedia </h1>
          <h2 className='font-bold text-xl'> The power of knowlegde </h2>
        </Header>
        <Content
          style={{
            margin: '16px',
          }}
        >
          <div
            className='flex flex-col justify-center'
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            { children }
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Data provided by Marvel. © 2014 Marvel
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;