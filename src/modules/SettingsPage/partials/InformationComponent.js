import { Col } from 'antd';
import React from 'react';
import BrandInformation from './BrandInformation';
import BillingPage from './BillingPage';
import AccountEditPage from './AccountEditPage';
import PolicyPage from './PolicyPage';
import { ColorBox } from '../components/index.styles';
import MyTeams from './MyTeams';

const InformationComponent = ({
  selectedText,
  currentUser,
  brandUpdate,
  uploadBrandLogo,
  imageUrl,
  accountUpdate,
  getCountries,
  getProvince,
  getCity,
  country,
  province,
  city,
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
}) => {
  return (
    <>
      {selectedText && (
        <ColorBox>
          {selectedText === 'Branding' && (
            <BrandInformation
              currentUser={currentUser}
              brandUpdate={brandUpdate}
              uploadBrandLogo={uploadBrandLogo}
              imageUrl={imageUrl}
              getCountries={getCountries}
              getProvince={getProvince}
              getCity={getCity}
              country={country}
              province={province}
              city={city}
              brandInfo={brandInfo}
              switchedBrand={switchedBrand}
              selectedUser={selectedUser}
              saveSelectedCurrentUser={saveSelectedCurrentUser}
              removeBrandLogo={removeBrandLogo}
            />
          )}
          {selectedText === 'Billing' && (
            <BillingPage
              getCountries={getCountries}
              getProvince={getProvince}
              currentUser={currentUser}
              getCity={getCity}
              country={country}
              province={province}
              city={city}
              billingInfo={billingInfo}
              accountCountry={accountCountry}
              accountProvince={accountProvince}
              accountCity={accountCity}
              updateBillingDetails={updateBillingDetails}
            />
          )}
          {selectedText === 'Account' && (
            <AccountEditPage
              accountUpdate={accountUpdate}
              currentUser={currentUser}
              getCountries={getCountries}
              getProvince={getProvince}
              getCity={getCity}
              accountCountry={accountCountry}
              accountProvince={accountProvince}
              accountCity={accountCity}
            />
          )}
          {selectedText === 'Policy' && <PolicyPage />}
          {selectedText === 'My Team' && <MyTeams />}
        </ColorBox>
      )}
    </>
  );
};

export default InformationComponent;
