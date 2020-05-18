import React from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout';
import GameTable from './containers/GameTable';

function App() {
  return (
    <div>
      <Layout>
        <GameTable/>
      </Layout>
    </div>
  );
}

export default App;
