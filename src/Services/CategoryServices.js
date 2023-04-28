import { notification } from 'antd';
import axios from 'axios';
import "../Components/GlobalVariable"




export async function getAllCategory() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/category`);
        return res.data.items

    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}

export async function getAllSubSubCategory() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/sub-sub-category`);
        return res.data.items

    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}


export async function deleteCategory(record) {
    try {
        await axios.delete(`${global.BaseUrl}/api/app/category/${record}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/category`);
        return res.data.items

    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}
export async function deleteSubCategory(record) {
    try {
        await axios.delete(`${global.BaseUrl}/api/app/sub-category/${record}`);
        const res = await axios.get(`${global.BaseUrl}/api/app/sub-category`);
        return res.data.items

    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}

export async function updateCategory(description, id, name, image, imgupload) {
    // console.log(imgupload)

    if (imgupload === "yes") {
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

        const base64 = await convertBase64(image)
        // console.log("base64", base64)
        try {

            await axios.put(`${global.BaseUrl}/api/app/category/${id}`, {
                "name": `${name}`,
                "description": `${description}`,
                "icon": `${base64}`
            });
            const res = await axios.get(`${global.BaseUrl}/api/app/category`);

            return res.data.items

        } catch (error) {
            console.log(error)
        }
    } else {

        try {
            await axios.put(`${global.BaseUrl}/api/app/category/${id}`, {
                "name": `${name}`,
                "description": `${description}`,
                "icon": `${image}`
            });
            const res = await axios.get(`${global.BaseUrl}/api/app/category`);
            return res.data.items
        } catch (error) {
            console.log(error)
        }

    }


}
export async function updateSubCategory(description, id, name, cid) {
    try {
        await axios.put(`${global.BaseUrl}/api/app/sub-category/${id}`, {
            "name": `${name}`,
            "description": `${description}`,
            "categoryId": `${cid}`
        }
        )

        const res = await axios.get(`${global.BaseUrl}/api/app/sub-category`);
        return res.data.items
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }
}

export async function postCategory(values, e) {

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
    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/category`, {
            "name": `${values.Category_Name}`,
            "description": `${values.Category_Description}`,
            "icon": `${base64}`
        })
        notification.success({
            message: 'Category has been added successfull',

        });
        // window.location.reload(false)
        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }



}

export async function postSubSubCategory(values) {
    console.log(values)
    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/sub-sub-category`, {
            "name": `${values.Sub_Category_Name}`,
            "description": `${values.Sub_Category_Description}`,
            "subCategoryId": values.SubCategory
        });
        notification.success({
            message: 'SubSubCategory has been added successfull',

        });

        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }

}
export async function postSubCategory(values) {

    try {
        const res = await axios.post(`${global.BaseUrl}/api/app/sub-category`, {
            "name": `${values.Sub_Category_Name}`,
            "description": `${values.Sub_Category_Description}`,
            "categoryId": values.Category
        });
        notification.success({
            message: 'SubCategory has been added successfull',

        });

        return res
    } catch (error) {
        notification.error({
            message: 'Something Error',

        });
    }

}

export async function getAllSubCategory() {
    try {
        const res = await axios.get(`${global.BaseUrl}/api/app/sub-category`);
        return res.data.items
    } catch (error) {
        console.log(error)
    }
}