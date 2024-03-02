import React, { useEffect, useRef, useState } from 'react'
import { MediaModal, Heading } from './UploadFiles'
import styled from 'styled-components'
import { Button, Col, Divider, Input, Row,Spin } from 'antd'
import Flex from '@components/common/Flex';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons';

import { updateFileUploadLoader ,Unsplash} from '../../../actions';
import { updateUnsplashFileList } from '../../../extendedAction';
import { useDispatch, useSelector } from 'react-redux';

const StyledDevider = styled(Divider)`
height: 1px ;
background: #F4F4F5;
width: 100%;
margin: 0px 0px 20px 0px;
`
const SearchDiv = styled(Input)`
height: 36px;
background: #FFFFFF;
border: 1px solid #D9D9D9;
border-radius: 5px;
margin-bottom:20px;
`
const ImagesDiv = styled.div`
height:580px;
overflow-y:scroll;
margin-bottom:20px;
.checkedBtn {
 position: absolute;
 top: 5px;
 left: 10px;
 cursor: pointer;
}
.notSelected {
 background: #fff;
 border-radius: 50%;
 border: 2px solid #4AACEA;
 width: 30px;
 height: 30px
}
`
const Buttons = styled(Button)`
//padding: 8px 30px;
width: 109px;
height: 36px;
font-weight: 700;
font-size: 16px;
background:${props => props.name ? "#4AACEA" : "#FFFFFF"};
color:${props => props.name ? "#FFFFFF" : " #D9D9D9"};
border:${props => props.name ? "none" : "1px solid #D9D9D9"};
border-radius: 5px;
margin-right:10px;
&:hover {
background:${props => props.name ? "#4AACEA" : "#FFFFFF"};
color:${props => props.name ? "#FFFFFF" : " #D9D9D9"};
border:${props => props.name ? "none" : "1px solid #D9D9D9"};
}
&.btn-active{
 background:${props => props.name ? "#4AACEA" : "#FFFFFF"};
 color:${props => props.name ? "#FFFFFF" : " #D9D9D9"};
 border:${props => props.name ? "none" : "1px solid #D9D9D9"};
}
`
const UnsplashPop = ({ openUnsplash, setOpenUnsplash }) => {
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState(null);
  const [selected, setSelected] = useState([])
  const [list, setList] = useState([])
  const [page, setPage] = useState(1);
  const [filteredList, setFilteredList] = useState([])
  useEffect(() => {
    dispatch(Unsplash())
  }, [openUnsplash])

  const unSplashfileList = useSelector(
    state => state?.socialMedialExtended?.unsplashFileList,
  ); 
  const unSplashImages = useSelector((state) => state.socialMedialIntegration.images)

  useEffect(() => {
    dispatch(Unsplash(debouncedTerm))
    setList([])
  }, [debouncedTerm]);
  useEffect(() => {
    let datahandle = [];
    unSplashImages?.length > 0 &&
      unSplashImages?.map(data => {
        datahandle?.push({ ...data, isActive: false });
      });
    setFilteredList([...filteredList, ...datahandle])
    const uniqueArray = filteredList.filter((obj, index, arr) => {
      return arr.findIndex((t) => t.id === obj.id) === index;
    });
    setList(uniqueArray);
    //searched data
    if (debouncedTerm) {
      unSplashImages?.results?.length > 0 &&
        unSplashImages?.results?.map(data => {
          datahandle.push({ ...data, isActive: false });
        });
      setList([...list, ...datahandle]);
    }
  }, [unSplashImages, openUnsplash]);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchVal);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchVal]);

  const handleButtonClick = val => {
    dispatch(updateFileUploadLoader(true))
    setList(prevState => {
      const newState = prevState?.map(data => {
        if (data?.id === val?.id) {
          if (data.isActive) {
            return { ...data, isActive: false };
          } else {
            return { ...data, isActive: true };
          }
        } else {
          return data;
        }
      });
      return newState;
    });
    const newState = list?.filter((item) => item?.isActive === val?.isActive)
    setSelected(newState);
  };

  const filtereredData = list?.filter((data) => data?.isActive === true) // to filter active status images

  const containerRef = useRef()
  const sendMediaUrl = () => {
    dispatch(updateFileUploadLoader(false))
    let datahandle = [];
    filtereredData?.length > 0 &&
      filtereredData?.map(data => {
        datahandle.push({ ...data, thumbUrl: data?.urls?.full + ".jpg" });
      });
    // setUnSplashFileList([...unSplashfileList, ...datahandle])
     dispatch(updateUnsplashFileList([...unSplashfileList, ...datahandle])) 
    setOpenUnsplash(false)
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      let increasedPage = page + 1
      setPage(increasedPage);
      if (container.scrollTop + container.clientHeight === container.scrollHeight) {
        dispatch(Unsplash(debouncedTerm, increasedPage))
      }
    }
  };

  return (
    <MediaModal
      open={openUnsplash}
      onCancel={() => setOpenUnsplash(false)}
      closable={true}
      footer={null}
      width="1315px"
      height="732px"
      style={{ marginTop: "-80px" }}
    >
      <Heading>Select media</Heading>
      <StyledDevider />
      <SearchDiv prefix={<SearchOutlined style={{ paddingRight: "5px", marginRight: "5px", borderRight: "1px solid #D9D9D9" }} />} maxLength={15} placeholder='Serach Unsplash'
        onChange={(e) => {
          setSearchVal(e.target.value)
        }} />
      <ImagesDiv onScroll={handleScroll} ref={containerRef}>
        {list?.length > 0 ?
          <Row>
            {list?.map((data) => {
              return (
                <Col span={4} style={{ marginBottom: "10px" }} onClick={() => handleButtonClick(data)}>
                  {list?.length > 0 &&
                    <div className='checkedBtn'>
                      <div className='notSelected'>
                        {data?.isActive && <CheckOutlined style={{ color: "#4AACEA", margin: "3px", fontSize: "20px" }} />}
                      </div>
                    </div>}
                  <img src={data?.urls?.small} alt="noimg" width="200px" height="250px" style={{ borderRadius: "10px", border: data?.isActive && "4px solid #4AACEA" }} />
                </Col>
              )
            })}
          </Row> : <Flex center alignCenter style={{ height: "300px", margin: "auto", placeItems: "center" }}>
            <Spin /><br /><span> Loading...</span></Flex>}
      </ImagesDiv>
      <Flex end>
        <Buttons className='btn-active' onClick={() => {
          setOpenUnsplash(false)
        }}>Cancel</Buttons>
        {selected?.length > 1 && <Buttons className='btn-active' name="primary" onClick={sendMediaUrl}>Use Media</Buttons>}
      </Flex>
    </MediaModal>
  )
}

export default UnsplashPop