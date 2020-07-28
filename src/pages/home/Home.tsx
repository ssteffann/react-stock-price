import React, {FunctionComponent, useEffect, useState} from 'react';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from "antd/lib/spin";
import {mapData} from "./helpers";
import axios from "../../config/api";
import LineChart from "../../components/charts/line-chart";
import SymbolSearch from "../../components/symbol-search/SymbolSearch";

const DEFAULT_SYMBOL = 'IBM';

const Home: FunctionComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getData = async (symbol: string = DEFAULT_SYMBOL): Promise<any> => {
        setLoading(true);
        try {
            const response = await axios.get('/query', {
                params: {
                    function: 'TIME_SERIES_DAILY',
                    symbol
                }
            })

            // @ts-ignore
            setData(mapData(response.data['Time Series (Daily)']));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (

        <Row gutter={[20, 20]}>
            <Col span={12}>
                <h2>Start typing, to search symbols:</h2>
              <SymbolSearch
                  defaultValue={DEFAULT_SYMBOL}
                  placeholder="Company name or Symbol"
                  onSelect={getData} />
            </Col>

            <Col span={24}>
                <Card>
                    <Spin spinning={loading}>
                        <LineChart data={data}/>
                    </Spin>
                </Card>
            </Col>

        </Row>

    );
};

Home.displayName = 'Home';

export default Home;
