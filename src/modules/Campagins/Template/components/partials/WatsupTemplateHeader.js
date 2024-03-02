import React, { memo } from 'react';
import * as T from './CreateTemplateForm.styles';

function WatsupTemplateHeader({ title, description, optional }) {
  return (
    <div style={{ margin: '10px 0' }}>
      <T.HeaderText>
        {title && <span>{title}</span>}
        {optional && <span className="optionalText">( Optional )</span>}
      </T.HeaderText>
      {description && <T.AddText>{description}</T.AddText>}
    </div>
  );
}

export default memo(WatsupTemplateHeader);
