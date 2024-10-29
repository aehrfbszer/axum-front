import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { newFetchRequest } from './fetchRequest'
import { Flex, Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
};


const myFetch = newFetchRequest({
  baseUrl: 'http://localhost:3001',
  timeout: 3000,
  loginUrl: '/login',
  refreshTokenUrl: {
    fetchConfig: {
      url: '/refreshlogin',
      method: 'POST',
      data: {
        dd: '55',
      },
    },
    setToken: () => '111',
  },
  getToken: () => 'ttt',
  handleMessage: {
    error: (msg) => console.warn(msg),
  },
})
const { mainFetch: fetchAxum, resetLoadingTool } = myFetch
resetLoadingTool({
  start: () => {
    console.log('start-----------------------')
  },
  finish: () => {
    console.log('finish-----------------------')
  },
  error: () => {
    console.log('error-----------------------')
  },
})


const testAxum = () => {

  const doit = () => fetchAxum({
    url: '/users',
    method: 'post',
    data: {
      username: 'uuuui'
    }
  }, {
    repeat_request_cancel: true
  }).then(
    res => {
      console.log(res, 'RRRT');
    }
  )
  doit()
  doit()
  doit()

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>
          <div className="main-continer">
            <div>
              <div className="card">
                <button
                  onClick={() => {
                    fetchAxum({
                      url: '/hello',
                      method: 'GET',
                    }, {
                      responseIsJson: false
                    }).then(res => res.text()).then(
                      text => {
                        console.log(text, 'tt');
                        confirm(text)
                      }
                    )
                  }}
                >
                  Say Hello
                </button>
              </div>
              <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            </div>
            <div>
              <div>
                <a href="https://vitejs.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>test axum</h1>
              <div className="card">
                <button
                  onClick={() => {
                    setCount((count) => count + 1)
                    testAxum()
                  }}
                >
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>


  )
}

export default App
