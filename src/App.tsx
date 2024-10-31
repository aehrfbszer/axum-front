import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { newFetchRequest } from './fetchRequest'
import { Layout } from 'antd';
import { AutoPendingRetry } from './pendingCountTimes'

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

const letMeTry = new AutoPendingRetry(5, undefined, true)


const testAxum = () => {

  const doitSuccess = () => fetchAxum({
    url: '/users',
    method: 'post',
    data: {
      username: 'uuuui'
    }
  }).then(
    res => {
      console.log(res, 'RRRT');
    }
  )


  const doitFail = (path: string) => () => fetchAxum({
    url: `/${path}`,
    method: 'post',
    data: {
      username: 'uuuui'
    }
  }).then(
    res => {
      console.log(res, 'RRRT');
    }
  )


  letMeTry.generatorOne(
    doitFail('1111')
  )
  letMeTry.generatorOne(
    doitFail('2222')
  )
  letMeTry.generatorOne(
    doitFail('3333')
  )
  letMeTry.generatorOne(
    doitFail('4444')
  )


  let cc = 0

  const timer = setInterval(
    () => {
      cc++
      if (cc === 3) clearInterval(timer)
      letMeTry.generatorOne(
        doitSuccess
      )
    }, 80
  )

}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout >
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
