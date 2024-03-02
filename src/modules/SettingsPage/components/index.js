import React, { useState } from "react";
import { ListOfButtons } from "../partials/ListOfButtons";
import { StyledBox } from "./index.styles";
import InformationComponent from "../partials/InformationComponent";
import { useResponsive } from "../../../hooks/useResponsive";

const SettingsPage = ({
    country,
    province,
    city,
    selectedText,
    currentUser,
    saveText,
    brandUpdate,
    getCurrentUserInfo,
    imageUrl,
    uploadBrandLogo,
    accountUpdate,
    getCountries,
    getProvince,
    getCity,
    brandInfo,
    accountCountry,
    accountProvince,
    accountCity,
    switchedBrand,
    selectedUser,
    saveSelectedCurrentUser,
    removeBrandLogo,
    updateBillingDetails,
    billingInfo,
    viewPlansDetails,
    plansList
}) => {
    const { mobileOnly, tabletOnly } = useResponsive();
    return (
        <StyledBox mobileOnly={mobileOnly} tabletOnly={tabletOnly}>
            <ListOfButtons saveText={saveText} selectedText={selectedText} />
            <InformationComponent
                selectedText={selectedText}
                currentUser={currentUser}
                brandUpdate={brandUpdate}
                getCurrentUserInfo={getCurrentUserInfo}
                uploadBrandLogo={uploadBrandLogo}
                imageUrl={imageUrl}
                accountUpdate={accountUpdate}
                getCountries={getCountries}
                getProvince={getProvince}
                getCity={getCity}
                country={country}
                province={province}
                city={city}
                brandInfo={brandInfo}
                accountCountry={accountCountry}
                accountProvince={accountProvince}
                accountCity={accountCity}
                switchedBrand={switchedBrand}
                selectedUser={selectedUser}
                saveSelectedCurrentUser={saveSelectedCurrentUser}
                removeBrandLogo={removeBrandLogo}
                billingInfo={billingInfo}
                updateBillingDetails={updateBillingDetails}
            />
        </StyledBox>
    )
}

export default SettingsPage;