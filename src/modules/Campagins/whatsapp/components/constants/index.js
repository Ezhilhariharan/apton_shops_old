import MailEditIcon from "@components/icons/MailEditIcon"
import SpeakerIcon from "@components/icons/SpeakerIcon"
import DeleteIcon from "@components/icons/DeleteIcon"
import EditIcon from "@components/icons/EditIcon"
import ApproveIcon from "@components/icons/ApproveIcon"
import WarningIcon from "@components/icons/WarningIcon"
import RejectIcon from "@components/icons/RejectIcon"
import CalendarIcon from "@components/icons/CalenderIcon"
import TickMarkIcon from "@components/icons/TickMarkIcon"
import LeftArrowIcon from "@components/icons/LeftArrowIcon"
import OpenMsg from "@components/icons/OpenMsg"
export const CampaginsInfo = [
    {
        title :"Draft",
        icon : MailEditIcon,
        value : 0
    },
    {
        title :"Scheduled",
        icon : CalendarIcon,
        value : 0
    },
    {
        title :"Running",
        icon : SpeakerIcon,
        value : 0
    },
    {
        title :"Completed",
        icon : TickMarkIcon,
        value : 0
    }
]

export const TemplatesInfo = [
    {
        title :"Draft",
        icon : EditIcon,
        value : 0
    },
    {
        title :"Approved",
        icon : ApproveIcon,
        value : 0
    },
    {
        title :"Pending",
        icon : WarningIcon,
        value : 0
    },
    {
        title :"Rejected",
        icon : RejectIcon,
        value : 0
    },
]

export const ProspectInfo = [
    {
        title :"Delivered",
        icon : "Delivered",
        value : 0
    },
    {
        title :"Opened",
        icon : TickMarkIcon,
        value : 0
    },
    {
        title :"Replied",
        icon : LeftArrowIcon,
        value : 0
    },
    {
        title :"Bounced",
        icon : WarningIcon,
        value : 0
    },


]

export const BotInfo = [
    {
        title :"Draft",
        icon : EditIcon,
        value : 0,
        status:0
    },
    {
        title :"Active",
        icon : ApproveIcon,
        value : 0,
        status:1
    },
    // {
    //     title :"Running",
    //     icon : SpeakerIcon,
    //     value : 0
    // },
    {
        title :"Inactive",
        icon : RejectIcon,
        value : 0,
        status:-1
    },
]