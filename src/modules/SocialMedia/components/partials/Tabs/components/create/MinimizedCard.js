import React, {memo} from 'react'
import {
  MinimizeCard,
  TextBorder,
  TextEllipse,
} from './Pages.style';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

function MinimizedCard({ postId, minimizePost }) {
   const feedDiscription = useSelector(
    state => state?.socialMedialExtended?.feedDescription,
  ); 
  return (
        <MinimizeCard>
          <TextBorder>
            <TextEllipse
              ellipsis={{ rows: 1 }}
              onClick={() => minimizePost(postId)}
            >
              {feedDiscription}
            </TextEllipse>
          </TextBorder>
        </MinimizeCard>
  )
}

export default memo(MinimizedCard)