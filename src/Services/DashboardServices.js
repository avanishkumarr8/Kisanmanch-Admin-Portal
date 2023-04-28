import { notification } from 'antd';
import axios from 'axios';
import "../Components/GlobalVariable"

export async function getAllCount() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/dashboard/metrics`)
        return res.data
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });

    }
}

export async function getAllOrderTable() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/order-table`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getOrderViaId(id) {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/${id}`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}