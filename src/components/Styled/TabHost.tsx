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
    return <div className="tabhost">
        {items.map(x =>
            <button className={x.value === selected ? "selected" : ""} onClick={() => onClick && onClick(x.value)} key={x.value}>
                <h3>{x.name}</h3>
            </button>)}
    </div>;
};
export default TabHost;