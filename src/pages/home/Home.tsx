import React, {FunctionComponent, useEffect, useState} from 'react';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from "antd/lib/spin";
import Switch from "antd/lib/switch";

import {mapData} from "./helpers";
import axios from "../../config/api";
import LineChart from "../../components/charts/line-chart";
import SymbolSearch from "../../components/symbol-search/SymbolSearch";

const DEFAULT_SYMBOL = 'IBM';

const Home: FunctionComponent = () => {
    const [data, setData] = useState<object[]>([]);
    const [symbol, setSymbol] = useState(DEFAULT_SYMBOL);
    const [loading, setLoading] = useState(false);
    const [showSma, setSma] = useState(false);

    const getData = async (symbol: string = DEFAULT_SYMBOL): Promise<any> => {
        setLoading(true);
        setSymbol(symbol);

        try {
            const response = await axios.get('/query', {
                params: {
                    function: 'TIME_SERIES_DAILY',
                    symbol
                }
            })

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
        <>
            <Row gutter={[20, 20]}
                 align="bottom"
                 justify="space-between">
                <Col span={12}>
                    <div>Start typing, to search symbols:</div>
                    <SymbolSearch
                        defaultValue={DEFAULT_SYMBOL}
                        placeholder="Company name or Symbol"
                        onSelect={getData}/>
                </Col>

                <Col>
                    Show SMA <Switch onChange={setSma}/>
                </Col>
            </Row>

            <Col span={24}>
                <Card>
                    <Spin spinning={loading}>
                        <LineChart
                            title={`${symbol}: Stock Price`}
                            id="lineChart"
                            showSma={showSma}
                            data={data}/>
                    </Spin>
                </Card>
            </Col>
        </>
    );
};

Home.displayName = 'Home';

export default Home;
