import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GenericTable from './components/common/tablas/GenericTable'
function App() {
  const [count, setCount] = useState(0)

  const headers = ["Nombre", "Edad", "Ciudad"]
  const data = [
    { Nombre: "Ana", Edad: 25, Ciudad: "Santiago" },
    { Nombre: "Luis", Edad: 30, Ciudad: "Temuco" },
    { Nombre: "Valentina", Edad: 22, Ciudad: "Valdivia" },
  ]

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <GenericTable headers={headers} data={data} />

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
