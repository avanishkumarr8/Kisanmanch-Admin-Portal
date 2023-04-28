import React from 'react'
import axios from 'axios';
import { notification } from 'antd';

export async function getAllBuyersList() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/buyer`);
        return res.data.items
    } catch (error) {
        notification.error({
            message: 'Something Error',
        });
    }
}

export async function getAllSellersList() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/seller`);
        return res.data.items
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}