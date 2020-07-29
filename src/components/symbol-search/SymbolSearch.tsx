import React, {useMemo, useState} from 'react';
import Select from "antd/lib/select";
import axios from "../../config/api";
import debounce from 'lodash.debounce';
import {buildOptions, OptionType} from './helpers';

interface Props {
    onSelect: (value: string) => void,
    placeholder?: string,
    defaultValue?: string,
}

const {Option} = Select;

const SymbolSearch = ({onSelect, placeholder, defaultValue}: Props) => {
    const [options, setOptions] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const getSymbol = async (keywords: string = ''): Promise<any> => {
        setLoading(true);
        try {
            const response = await axios.get('/query', {
                params: {
                    function: 'SYMBOL_SEARCH',
                    keywords
                }
            })

            setOptions(buildOptions(response.data.bestMatches));

        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const searchSymbol = useMemo(() => debounce(getSymbol, 400), [])

    return (
        <Select
            style={{width: '100%'}}
            showSearch
            loading={loading}
            placeholder={placeholder}
            onSearch={searchSymbol}
            onChange={(value) => {
                onSelect(value);
                setValue(value);
            }}
            value={value}
        >
            {options.map((item: OptionType) => {
                return (<Option key={item.value} value={item.value}>{item.label}</Option>);
            })}
        </Select>
    );
};

SymbolSearch.displayName = 'SymbolSearch';

export default SymbolSearch;
