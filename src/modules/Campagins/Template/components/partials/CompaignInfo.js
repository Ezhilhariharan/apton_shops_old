import React from "react";
import { CampaginsInfo } from "../../../whatsapp/components/constants";
import InfoCard from "../../../whatsapp/components/partials/InfoCard";
import Flex from '@components/common/Flex';

const CompaignInfo = ({campOverViewCard}) => {
    return (
        <Flex spaceBetween>
            {CampaginsInfo.map((item, id) => {
                return (
                    <InfoCard
                        key={id}
                        item={item}
                        campOverViewCard={campOverViewCard}
                    />
                )
            })}
        </Flex>
    )
}

export default CompaignInfo;