import { notification } from 'antd';
import axios from 'axios';
import "../Components/GlobalVariable"


export async function getAllOrderTable() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/order-table`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getPendingOrders() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/pending-orders`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export async function getOrderViaId(id) {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/full-order/${id}`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteOrder(id) {
    // console.log(id)
    try {
        await axios.delete(`${global.BaseUrl}/api/app/order/${id}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/order/order-table`);
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export async function rejectOrders(id) {
    // console.log(id)
    try {
        await axios.post(`${global.BaseUrl}/api/app/order/reject-order/${id}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/order/pending-orders`);
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export async function approveOrders(id) {
    // console.log(id)
    try {
        await axios.post(`${global.BaseUrl}/api/app/order/approve-order/${id}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/order/pending-orders`);
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export async function updateOrder(id, orderNo, address, status, totalprice, date, mobileUserId) {

    try {
        await axios.put(`${global.BaseUrl}/api/app/order/${id}`, {
            "orderNumber": `${orderNo}`,
            "deliveryDate": `${date}`,
            "deliveryPrice": 0,
            "deliveryAddress": `${address}`,
            "tax": 0,
            "payementDate": "2022-08-30T09:09:39.653Z",
            "payementMethod": 0,
            "orderTotalPrice": totalprice,
            "orderDescription": "string",
            "mobileUserId": `${mobileUserId}`,
            "orderItems": [
                {
                    "quantity": 0,
                    "productId": 0
                }
            ]
        });
        const res = await axios.get(`${global.BaseUrl}/api/app/order/order-table`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getAllRejectedOrders() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/rejected-orders`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export async function getAllApprovedOrders() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/approved-orders`);
        return res.data
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}
export async function getAllCompletedOrders() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/completed-orders`);
        return res.data
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}

export async function getAllCancelledOrder() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/order/cancelled-orders`);
        return res.data
    } catch (error) {
        console.log(error)
    }
}

