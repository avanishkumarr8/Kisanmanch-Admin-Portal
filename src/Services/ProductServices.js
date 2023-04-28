import "../Components/GlobalVariable"
import { notification } from 'antd';
import axios from 'axios';

export async function getAllProducts() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/product/product-table`);

        return res.data

    } catch (error) {
        console.log(error)
    }
}

export async function getProductsViaId(id) {
    // console.log(id)
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/product/${id}`);

        return res.data

    } catch (error) {
        console.log(error)
    }
}
export async function deleteProduct(id) {
    // console.log(id)
    try {
        await axios.delete(`${global.BaseUrl}/api/app/product/${id}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/product/product-table`);
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export async function postProduct(values, e, p) {
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };

        });
    }

    const base64 = await convertBase64(e)

    const convertBase64P = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };

        });
    }

    const base64P = await convertBase64P(p)

    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/product`, {
            "name": `${values.Product_Name}`,
            "description": `${values.Product_Description}`,
            "techical_Specifications": `${values.Technical_Specification}`,
            "price": values.Price,
            "brand": `${values.Brand}`,
            "picture1": `${base64}`,
            "picture2": "",
            "picture3": "",
            "file": `${base64P}`,
            "hsN_Code": `${values.HSN_Code}`,
            "sgst": values.SGST,
            "igst": values.IGST,
            "gst": 0,
            "sku": values.SKU,
            "skU_Size": values.SKU_Size,
            "country": `${values.Country}`,
            "pinCode": `${values.Pincode}`,
            "product_Literatur": `${values.Product_Literatur}` ? values.Product_Literatur !== "" : "",
            "deliveryCost": values.Delivery_shipment_Cost,
            "deliveryTime": "2022-08-19T07:26:19.609Z",
            "targetCrops": `${values.Target_Crops_and_Disease}`,
            "dosage": `${values.Dosage}`,
            "application": `${values.Application}`,
            "retail_PickUpPoint": `${values.Retail_Pick_up_Point_for_Product}`,
            "categoryID": `${values.Product_Category}`,

        });
        notification.success({
            message: 'Product has been added successfully',

        });

        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
    // console.log(values)

}

export async function updateProduct(pinCode, country, pick, app, dosage, disease, prodLit, shipCost, hsnCode, skuSize, sku, iGst, sGst, disc, prize, quan, techSpec, prodCategory, productDesc, productName, prodId, img) {
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error)
            };

        });
    }

    const base64 = await convertBase64(img)
    try {
        await axios.put(`${global.BaseUrl}/api/app/product/${prodId}`, {
            "name": `${productName}`,
            "description": `${productDesc}`,
            "techical_Specifications": `${techSpec}`,
            "price": prize,
            "brand": "string",
            "picture1": `${base64}`,
            "picture2": "",
            "picture3": "",
            "file": "",
            "hsN_Code": `${hsnCode}`,
            "sgst": sGst,
            "igst": iGst,
            "gst": 0,
            "sku": sku,
            "skU_Size": skuSize,
            "country": `${country}`,
            "pinCode": `${pinCode}`,
            "product_Literatur": `${prodLit}`,
            "deliveryCost": shipCost,
            "deliveryTime": "2022-08-22T09:43:22.342Z",
            "targetCrops": `${disease}`,
            "dosage": `${dosage}`,
            "application": `${app}`,
            "retail_PickUpPoint": `${pick}`,
            "categoryID": prodCategory,

        });
        const res = await axios.get(`${global.BaseUrl}/api/app/product/product-table`);
        return res.data
    } catch (error) {

    }
}