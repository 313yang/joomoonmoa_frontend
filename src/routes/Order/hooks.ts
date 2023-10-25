import { RequestGet } from "@/libs/Function";
import { getOrderNews } from "@/libs/api/orders";
import { useEffect } from "react";

// export const useGetOrderList = () => {
//     const getNewList = async () => {
//         const data = await RequestGet(getOrderNews) || [];
//         setNewList(data);
//         setCheckedList(data.map(x => x.purchasedItemId));
//     };
//     useEffect(() => {
//         getNewList();
//     }, []);
// };