import React from "react";
import * as M from "./MyTeams.styles";
import SmallMailIcon from "../../../components/icons/SmallMailIcon";
import LargeMailIcon from "../../../components/icons/LargeMailIcon";
import { Dropdown, Form, Select } from "antd";
import { UpgardePlanButton } from "../components/index.styles";

const MyTeams = () => {
    return (
        <>
            <M.MyTeamsBox>
                <div>
                    <div></div>
                    <div></div>
                    <Form>
                        <Form.Item>
                            <M.MailInput 
                                placeholder="Enter email address" 
                                prefix={<SmallMailIcon style={{marginRight: "1rem", marginLeft: "0.6rem"}} />}
                                suffix={<M.CustomizedSelect>
                                    <option className="optionStyle">Member</option>
                                    <option className="optionStyle">Admin</option>
                                </M.CustomizedSelect>}
                            />
                        </Form.Item>
                        <UpgardePlanButton>Send Invite</UpgardePlanButton>
                    </Form>
                </div>
                
            </M.MyTeamsBox>
        </>
    )
}

export default MyTeams;