export interface OptionType {
    label: string,
    value: string
}


export const buildOptions = (data: Array<any>): Array<OptionType> => {
    return data.map((item: any) => {
        return {
            label: `${item['1. symbol']}: ${item['2. name']}`,
            value: item['1. symbol']
        }
    })
}
