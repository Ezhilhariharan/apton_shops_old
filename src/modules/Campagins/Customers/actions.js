import parentSelector from "../../../selectors";
import request from "@utils/request";
import { notification } from "antd";

export const UPDATE_CUSTOMER_CONTACT_LIST = 'UPDATE_CUSTOMER_CONTACT_LIST';
export const UPDATE_SINGLE_CONTACT_DETAILS = 'UPDATE_SINGLE_CONTACT_DETAILS';
export const UPDATE_EXPORT_CONTACT_FILE = 'UPDATE_EXPORT_CONTACT_FILE';
export const UPDATE_UPLOADED_FILE_INFO = 'UPDATE_UPLOADED_FILE_INFO';
export const UPDATE_ERROR_FILE_UPLOAD = 'UPDATE_ERROR_FILE_UPLOAD';
export const UPDATE_TAGS = 'UPDATE_TAGS';
export const UPDATE_PREVIEW_DETAILS = 'UPDATE_PREVIEW_DETAILS';

export const saveContactList = contacts => ({
    type: UPDATE_CUSTOMER_CONTACT_LIST,
    contacts,
})

export const updateSingleContact = contactDetails => ({
    type: UPDATE_SINGLE_CONTACT_DETAILS,
    contactDetails,
})

export const updatePreviewContent = previewDetails => ({
    type: UPDATE_PREVIEW_DETAILS,
    previewDetails,
})

export const updateTagList = tags => ({
    type: UPDATE_TAGS,
    tags,
})

export const updateExportContact = contactFile => ({
    type: UPDATE_EXPORT_CONTACT_FILE,
    contactFile,
})

export const removeContactDetailsCancelSubmit = () => async dispatch => {
    dispatch(updateSingleContact({}))
}

export const updateBulkUploadCSV = fileInfo => ({
    type: UPDATE_UPLOADED_FILE_INFO,
    fileInfo,
})

export const updateErrorFileUpload = fileError => ({
    type: UPDATE_ERROR_FILE_UPLOAD,
    fileError,
})

export const contactList = (direction, searchTag, fromDate, toDate, pageNumber, limit) => async (dispatch, getState) => {
    try {
        const state = getState();
        const switchedBrand = parentSelector.getSwitchedBrands(state);
        const selectedDirection = direction ? `&field_value=${direction}` : "";
        const searchQuery = searchTag ? `&search=${searchTag}` : "";
        const selectedFromDate = (fromDate && toDate) ? `&from_date=${fromDate}&to_date=${toDate}` : ""
        const page = pageNumber ? `&page=${pageNumber}` : ""
        const limits = limit ? `&limit=${limit}` : `&limit=10`
        //const createdAt = direction === "desc" ? `&created_at=${direction}` : "";
        const listOfContacts = await request.get(
            `api/customer_contact_list?brand_id=${switchedBrand?.id}&account_id=${switchedBrand?.account_id}${selectedDirection}${searchQuery}${selectedFromDate}${page}${limits}`
        )
        if (listOfContacts.status === 200) {
            dispatch(saveContactList(listOfContacts.data))
        }
    } catch (error) {
        console.log("list of contact", error)
    }
}

export const createWhatsappContact = (value, form, setOpen, setPageNumber) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    const tagArray = value?.tags ? value?.tags : [];
    const fullMobileNumber = value?.countryCode + value?.phone_number
    try {
        if (value) {
            const createContact = await request.post(`api/add_brand_contacts`, {
                account_id: switchedBrand?.account_id,
                brand_id: switchedBrand?.id,
                first_name: value?.first_name,
                last_name: value?.last_name,
                phone_number: parseInt(value?.phone_number),
                location: value?.location,
                email: value?.email,
                tags: tagArray,
                country_code: parseInt(value?.countryCode),
            })
            if (createContact?.status === 200) {
                setPageNumber(1)
                dispatch(contactList())
                notification.success({
                    message: '',
                    description: 'Contact created'
                })
                form.resetFields()
                setOpen(false)
            }
        }
    } catch (error) {
        console.log("create contact", error)
        if(error?.response?.data?.error === "[\"Email has already been taken\", \"Phone number has already been taken\"]") {
            notification.error({
                message: '',
                description: "Email has already been taken"
            })
        }
        else if(error?.response?.data?.error === "[\"Phone number has already been taken\"]") {
            notification.error({
                message: '',
                description: "Phone number has already been taken"
            })
        }
        else if(error?.response?.data?.error === "[\"Email has already been taken\"]") {
            notification.error({
                message: '',
                description: "Email has already been taken"
            })
        }
        else {
            notification.error({
                description: error?.response?.data?.error
            })
        }
    }
}

export const singleContactDetails = (contactId, title) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    try {
        if (contactId) {
            const contactDetails = await request.get(`api/get_brand_contact?brand_id=${switchedBrand?.id}&id=${contactId}`)
            if (contactDetails?.status === 200) {
                if(title === "preview") {
                    dispatch(updatePreviewContent(contactDetails?.data))
                }
                else {
                    dispatch(updateSingleContact(contactDetails?.data))
                }
            }
        }
    } catch (error) {
        console.log("single contact", error)
        notification.error({
            message: '',
            description: error
        })
    }
}

export const deleteContact = (contactId, page, setSelectedKeys, setPageNumber) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    try {
        if (contactId) {
            const deleteContactDetails = await request.delete(
                `api/delete_brand_contact?id=${contactId}`)
            if (deleteContactDetails.status === 200) {
                setPageNumber && setPageNumber(1)
                dispatch(contactList("","","","", page))
                setSelectedKeys && setSelectedKeys([])
                notification.success({
                    message: '',
                    description: 'Contact deleted',
                })
            }
        }
    } catch (error) {
        console.log("delete contact", error)
    }
}

export const updateEditedContact = (values, form, setOpen, contactId, pageNumber) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    const tagArray = values?.tags ? values?.tags : [];
    const fullMobileNumber = values?.countryCode + values?.phone_number
    try {
        const editContact = await request.put(`api/update_brand_contacts`, {
            id: contactId,
            account_id: switchedBrand?.account_id,
            brand_id: switchedBrand?.id,
            first_name: values?.first_name,
            last_name: values?.last_name,
            email: values?.email,
            location: values?.location,
            tags: tagArray,
            phone_number: parseInt(values?.phone_number),
            country_code: parseInt(values?.countryCode),
        })
        if (editContact?.status === 200) {
            dispatch(contactList("","","","",pageNumber))
            notification.success({
                message: '',
                description: 'Contact edited successfully',
            })
            form.resetFields()
            setOpen(false)
            //dispatch(updateSingleContact({}))
            dispatch(removeContactDetailsCancelSubmit());
        }

    } catch (error) {
        console.log("update contact", error)
        if(error?.response?.data?.error === "[\"Email has already been taken\", \"Phone number has already been taken\"]") {
            notification.error({
                message: '',
                description: "Email has already been taken"
            })
        }
        else if(error?.response?.data?.error === "[\"Phone number has already been taken\"]") {
            notification.error({
                message: '',
                description: "Phone number has already been taken"
            })
        }
        else if(error?.response?.data?.error === "[\"Email has already been taken\"]") {
            notification.error({
                message: '',
                description: "Email has already been taken"
            })
        }
        else {
            notification.error({
                description: error?.response?.data?.error
            })
        }
    }
}

export const bulkUploadMethod = (value, setLoading) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    try {
        const bulkUpload = await request.post(`api/cus_bulk_upload`, {
            file_name: value?.file_name,
            file_path: value?.file_path,
            account_id: switchedBrand?.account_id,
            brand_id: switchedBrand?.id,
        })
        if (bulkUpload?.status === 200) {
            dispatch(updateBulkUploadCSV(bulkUpload?.data?.url))
            setLoading(false)
            dispatch(updateErrorFileUpload(""))
        }
    } catch (error) {
        console.log("bulk upload", error)
        setLoading(false)
        // notification.error({
        //     description: error?.response?.data?.error
        // })
        dispatch(updateErrorFileUpload(error?.response?.data?.error))
    }
}

export const uploadFinalCSVURL = (validURL, setOpen, setFileList, CSVerror, setShowError, setUploadApi, isCallUploadAPI) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    try {
        if(validURL && isCallUploadAPI) {
            const finalUpload = await request.post(`api/bulk_upload_contact`, {
                account_id: switchedBrand?.account_id,
                brand_id: switchedBrand?.id,
                file_path: CSVerror?.overview_count === CSVerror?.error_count ? (!CSVerror ? validURL : "") : validURL,
            })
            if(finalUpload?.status === 200) {
                if(!CSVerror) {
                    setOpen(false)
                    setShowError(false)
                    dispatch(updateBulkUploadCSV({}))
                }
                else {
                    setShowError(true)
                    setOpen(true)
                }
                setUploadApi(false)
                setFileList([])
                dispatch(contactList())
                notification.success({
                    message: "File uploaded successfully"
                })
            }
        }
    } catch (error) {
        console.log("upload final url csv", error)
        if(error?.response?.data?.error === "param is missing or the value is empty: file_path\nDid you mean?  file_path\n               format\n               action\n               brand_id") {
            setShowError(true)
            notification.error({
                message: "All rows are invalid"
            })
        }
        else {
            notification.error({
                message: error?.response?.data?.error
            })
        }
    }
}

export const exportFileMethod = (sort, tagSearch, fromDate, toDate) => async (dispatch, getState) => {
    const state = getState();
    const switchedBrand = parentSelector.getSwitchedBrands(state);
    try {
        const sortBy = sort ? `&field_value=${sort}` : "";
        const searchByTag = tagSearch ? `&search=${tagSearch}` : "";
        const selectedDate = (fromDate && toDate) ? `&from_date=${fromDate}&to_date=${toDate}` : ""
        const exportFile = await request.get(
            `api/export_cust_contacts_list?account_id=${switchedBrand?.account_id}&brand_id=${switchedBrand?.id}${sortBy}${searchByTag}${selectedDate}`)
        if (exportFile?.status === 200) {
            dispatch(updateExportContact(exportFile?.data?.file_url))
        }
    } catch (error) {
        console.log("export contacts", error)
    }
}

export const listOfTags = () => async dispatch => {
    try {
        const tagList = await request.get(`/api/brand_tags?limit=150`);
        if(tagList.status === 200) {
            dispatch(updateTagList(tagList?.data))
        }
    } catch (error) {
        console.log("list of tags", error)
    }
}