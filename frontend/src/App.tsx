import React from 'react'
import { Feed } from './Feed'
import { SortOrder } from './graphql/types'

export const App: React.FC = () => (
  <div className="App">
    <h1>Hello world</h1>
    <Feed q="Prisma" take={20} skip={0} sort={SortOrder.Desc} />
  </div>
)

export default App
