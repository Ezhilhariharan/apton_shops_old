import styled from 'styled-components';

export const ProspectCard = styled.div`
  width: 300px;
  height: auto;
  background: ${props => props?.backgroundColor};
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  cursor: pointer;
  padding-bottom: 10px;
`;

export const ProspectBody = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 14px rgb(0 0 0 / 15%);
  border-radius: 10px;
  margin: 7px;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
