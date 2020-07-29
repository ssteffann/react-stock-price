import React from 'react';
import 'antd/dist/antd.css';

import Layout from "antd/lib/layout";
import Home from './pages/home/Home'

const {Header, Content} = Layout;

function App() {
    return (
        <Layout style={{height: '100vh'}}>
            <Header>
                <h1 className="text-white">Stock Price - Alpha Vantage</h1>
            </Header>

            <Content style={{margin: 40, height: '100%'}}>
                <Home/>
            </Content>
        </Layout>
    );
}

export default App;
