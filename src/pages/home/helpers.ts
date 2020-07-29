
export interface Item {
    x: number,
    y: number
}


export const mapData = (data: any): Array<Item> => {
    return Object.keys(data).map((key: string) => {

        return {
            x:  new Date(key).getTime(),
            y: parseFloat(data[key]['4. close'] || 0),
        };
    });
}
