import React from 'react'
import axios from 'axios';
import { notification } from 'antd';

export async function postBuyer(values) {
    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/buyer`, {
            "businessEntityType": values.Business_Entity_Type,
            "businessType": values.Business_Type,
            "buyerName": `${values.Business_Name}`,
            "contactPersonName": `${values.Contact_Person_Name}`,
            "contactPersonPhone": `${values.Contact_Person_Phone}`,
            "contactPersonMobile": `${values.Contact_Person_Mobile}`,
            "registeredAddress": `${values.Registered_Address}`,
            "pin": `${values.Pin}`,
            "pan": `${values.Pan}`,
            "gstin": `${values.GSTIN}`,
            "fssaiNo": `${values.FSSAI_No}`,
            "fruits": values.Fruits,
            "vegetables": values.Vegitables,
            "exoticVegetables": values.Exotic_Vegitable,
            "dryFruits": values.Dry_Fruits
        })
        notification.success({
            message: 'Buyer has been added successfull',

        });
        // window.location.reload(false)
        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}

export async function postSeller(values) {
    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/seller`, {
            "organizationName": `${values.Organization_Name}`,
            "organizationType": 0,
            "contactPersonName": `${values.Contact_Person_Name}`,
            "contactPersonMobile": `${values.Contact_Person_Mobile}`,
            "address": `${values.Address}`,
            "pin": `${values.Pin}`,
            "fruits": values.Fruits,
            "fruitsFile": "",
            "vegetable": values.Vegitables,
            "vegetablesFiles": "",
            "exoticVegetables": values.Exotic_Vegitable,
            "exoticVegetablesFile": "",
            "dryFruits": values.Dry_Fruits,
            "dryFruitsFile": "",
            "others": values.Others,
            "othersFile": "",
            "harvestMonth": 0,
            "kisanManchMessage": `${values.Msg_for_KM_Team}`
        })

        notification.success({
            message: 'Seller has been added successfull',

        });
        // window.location.reload(false)
        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}