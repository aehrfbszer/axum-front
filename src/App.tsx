import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { newFetchRequest } from './fetchRequest'

const fun = () => {
  const myFetch = newFetchRequest({
    baseUrl: 'http://localhost:3000',
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
  const { mainFetch, resetLoadingTool } = myFetch

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

  const uuu = () => {
    mainFetch({
      url: '/x-www-form-urlencoded',
      method: 'post',
      data: new URLSearchParams({
        dsa: 'greg',
        gf: '🌙',
      }),
    }).then((res) => {
      console.log(res, 'FF')
    })
  }

  uuu()

  const query = () =>
    mainFetch(
      {
        url: '/',
        method: 'GET',
      },
      {
        responseIsJson: false,
        repeat_request_cancel: true,
      }
    )
      .then((res) => {
        res.text().then((it) => {
          console.log(it, '成功')
        })
      })
      .catch((e) => {
        console.log(e, '///')
      })
  query()
  query()
  query()
  query()
  query()
  query()
  query()
  query()

  mainFetch({
    url: '/test',
    method: 'POST',
  })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e, 'test')
    })

  mainFetch(
    {
      url: '/fail',
      method: 'get',
    },
    {
      responseIsJson: false,
    }
  )
    .then((r) => {
      r.text().then((it) => {
        console.log(it, 'jjjjjjj')
      })
    })
    .catch((e) => {
      console.log(e, 'fff')
    })
}



const testAxum = () => {
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
  const { mainFetch, resetLoadingTool } = myFetch
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
  const doit = () => mainFetch({
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
    <div className="main-continer">
      <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>test hono</h1>
        <div className="card">
          <button
            onClick={() => {
              setCount((count) => count + 1)
              fun()
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

  )
}

export default App
