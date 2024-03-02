import { Space, Divider, Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { lightColorsTheme } from '../../../../theme/styles/light/lightTheme';
import {
  BrandsDropDown,
  StyledSpan,
  StyledName,
  TextSpan,
} from '../../Header.styles';
import StepTwo from '../../../../modules/Auth/components/partials/BrandCreation/StepTwo';
import StepOne from '../../../../modules/Auth/components/partials/BrandCreation/StepOne';
// import {upgradePopup} from "../../../../modules/upgrade/container/index";
import Upgrade from '../../../../modules/upgrade/components/Upgrade';
import { upgradePopup } from '../../../../modules/upgrade/actions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getSocialMediaList } from '../../../../modules/NewIntegration/actions';
const { Option, OptGroup } = BrandsDropDown;
import Store from '@components/icons/Store';
const CenterBox = styled('div')`
  display: flex;
  justify-content: center;
`;
const CustomizedButton = styled(Button)`
  border: none;
  width: 90px;
  height: 40px;
  text-align: center;
  padding: 0;
  font-weight: 700;
  border-radius: 0;
  color: ${lightColorsTheme.darkBlack};
  :hover {
    color: ${lightColorsTheme.primary};
    border-bottom: 2px solid ${lightColorsTheme.primary};
  }
  :focus {
    color: ${lightColorsTheme.primary};
    border-bottom: 2px solid ${lightColorsTheme.primary};
  }
  :active {
    color: ${lightColorsTheme.primary};
    border-bottom: 2px solid ${lightColorsTheme.primary};
  }
`;

const BrandsDropDown1 = styled.div`
  padding: 6px 8px;
  margin: 5px 5px;
  font-size: 16px;
  font-weight: 500;
  color: #999999;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SelectComponent = ({
  headerBrandDetails,
  onboardingStep,
  updateOnboardingSteps,
  updateStepOneValues,
  onboardingInitiate,
  brandCategoryList,
  countryList,
  updatedStepTwoValues,
  onboardingStepOneValues,
  fetchBrandCategoryList,
  fetchCountryList,
  saveSwitchedBrand,
  switchedBrand,
  getBrandInfoAPI,
  brandLogoUrl,
  uploadCoverPhoto,
  pricingValidation,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [dynamicBrandSelection, setBrandSelection] =
    useState(headerBrandDetails);

  const userInfo = useSelector(
    state => state?.authSelector?.cusrentUser?.account?.id,
    shallowEqual
  );
  const priceValidation = useSelector(
    state => state?.authSelector?.pricingValidationObj,
    shallowEqual
  );
  // const brand = useSelector((state) => state?.parentReducer?.switchedBrand, shallowEqual)
  // const priceValidation = useSelector((state) => state?.authSelector?.pricingValidationObj, shallowEqual)
  const brandRetainLocal = localStorage.getItem('brandIndex');
  const accountInfo = useSelector(state => state?.authSelector?.cusrentUser);

  useEffect(() => {
    setBrandSelection(headerBrandDetails);
    saveSwitchedBrand(headerBrandDetails[brandRetainLocal]);
  }, [headerBrandDetails]);

  const handleBrandSelect = val => {
    const selectedIndex = headerBrandDetails?.findIndex(
      data => data.id === val
    );
    localStorage.setItem('brandIndex', selectedIndex);
    const selectedObj = dynamicBrandSelection?.filter(item => item.id == val);
    saveSwitchedBrand(selectedObj[0]);
    pricingValidation(userInfo, val);
    dispatch(getSocialMediaList());
  };
  const handleMultipleBrandStepper = () => {
    if (priceValidation?.add_brand) {
      updateOnboardingSteps(1);
      setOpen(true);
    } else {
      setOpenUpgrade(true);
      // useDispatch(upgradePopup(true))
    }
  };
  useEffect(() => {
    fetchBrandCategoryList();
    fetchCountryList();
    saveSwitchedBrand(headerBrandDetails[brandRetainLocal || 0]);
    pricingValidation(userInfo, headerBrandDetails[0]?.id);
  }, []);
  useEffect(() => {
    const brandSlug = headerBrandDetails?.filter(
      data => data.id === switchedBrand?.id
    )[0]?.slug;
    getBrandInfoAPI(brandSlug);
  }, [switchedBrand, headerBrandDetails]);
  return (
    <>
      {dynamicBrandSelection?.length > 0 && (
        <BrandsDropDown
          value={switchedBrand?.id}
          placeholder="custom dropdown render"
          bordered={false}
          onChange={value => handleBrandSelect(value)}
          getPopupContainer={triggerNode => triggerNode.parentNode} // Prevents Modal from closing on dropdown click
        >
          {/* <div>
            <BrandsDropDown1
              style={{
                fontSize: '17px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ pointerEvents: 'none' }}>Switch Brand</span>
              <span
                style={{
                  marginLeft: '25px',
                  fontWeight: '600',
                  color: '#4d4d4d',
                }}
              >
                {dynamicBrandSelection?.length}
              </span>
              <Store />
            </BrandsDropDown1>
          </div> */}

          {dynamicBrandSelection?.map((data, index) => {
            const firstLetter = data.name.split('');
            return (
              <Option
                value={data.id}
                key={index}
                className="selectedOption"
                style={{
                  // width: '100%',
                  padding: '20px 10px',
                }}
              >
                <StyledSpan
                  style={{ background: '#F4F4F5', borderRadius: '6px' }}
                >
                  {firstLetter[0]}
                </StyledSpan>
                <TextSpan>{data?.name}</TextSpan>
              </Option>
            );
          })}
          <OptGroup
            label={
              <CenterBox
                style={{ padding: '10px 0', borderTop: '1px solid #d9d9d9' }}
              >
                <CustomizedButton
                  style={{
                    width: '100%',
                    background: 'none',
                    borderRadius: '6px',
                    fontSize: '18px',
                  }}
                  onClick={handleMultipleBrandStepper}
                  disabled={accountInfo?.account?.id === 35}
                >
                  Add a brand
                </CustomizedButton>
              </CenterBox>
            }
          ></OptGroup>
        </BrandsDropDown>
      )}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        onOk={() => setOpen(false)}
      >
        {onboardingStep === 1 && (
          <StepOne
            updateOnboardingSteps={updateOnboardingSteps}
            updateStepOneValues={updateStepOneValues}
            uploadCoverPhoto={uploadCoverPhoto}
            brandLogoUrl={brandLogoUrl}
          />
        )}
        {onboardingStep === 2 && (
          <StepTwo
            updateOnboardingSteps={updateOnboardingSteps}
            updatedStepTwoValues={updatedStepTwoValues}
            onboardingInitiate={onboardingInitiate}
            onboardingStepOneValues={onboardingStepOneValues}
            brandCategoryList={brandCategoryList}
            countryList={countryList}
            setOpen={setOpen}
          />
        )}
      </Modal>
      <Upgrade popup={openUpgrade} close={setOpenUpgrade} />
    </>
  );
};
