
export interface Item {
    date: Date,
    price: number
}


export const mapData = (data: any): Array<Item> => {
    return Object.keys(data).map((key: string) => {

        return {
            date: new Date(key),
            price: parseFloat(data[key]['4. close'] || 0),
        };
    });
}
