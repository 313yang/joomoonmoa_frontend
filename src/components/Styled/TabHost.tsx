interface TabHostItemsType<T> {
    name: string;
    value: T;
}

interface TabHostType<T> {
    items: TabHostItemsType<T>[];
    onClick?: (val: T) => void;
    selected: T;
}

const TabHost = ({ items, onClick, selected }: TabHostType<any>) => {
    return <div>
        {items.map(x =>
            <button className={selected ? "selected" : ""} onClick={() => onClick && onClick(x.value)} key={x.value}>
                <h2>{x.name}</h2>
            </button>)}
    </div>;
};
export default TabHost;