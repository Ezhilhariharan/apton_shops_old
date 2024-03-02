import { connect, Connect } from "react-redux";
import WhatsappCustomers from "../components";
import { 
    contactList, 
    createWhatsappContact,
    deleteContact,
    singleContactDetails,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    bulkUploadMethod,
    exportFileMethod,
    uploadFinalCSVURL,
    //updateErrorFileUpload,
    listOfTags,
} from "../actions";
import customerSelector from "../selectors";

const mapStateToProps = state => ({
    contacts: customerSelector.getCustomerContacts(state),
    contactFile: customerSelector.getExportFile(state),
    fileInfo: customerSelector.getFileURL(state),
    fileError: customerSelector.getFileError(state),
    tags: customerSelector.getTagList(state),
    previewDetails: customerSelector.getPreviewDetails(state),
})

const mapDispatchToProps = {
    contactList,
    createWhatsappContact,
    deleteContact,
    singleContactDetails,
    updateEditedContact,
    removeContactDetailsCancelSubmit,
    bulkUploadMethod,
    exportFileMethod,
    uploadFinalCSVURL,
    //updateErrorFileUpload,
    listOfTags,
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatsappCustomers);