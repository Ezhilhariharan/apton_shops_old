export const messageDataFormating = (type, data,value) => {
  switch (type) {
    case 'image':
      return {
        type: type,
        image: {
          link: data?.path_url,
        },
        body: {
          text: value?.question,
        },
      };
    case 'video':
      return {
        type: type,
        video: {
          link: data?.path_url,
        },
        body: {
          text: value?.question,
        },
      };
    case 'document':
      return {
        type: type,
        document: {
          link: data?.path_url,
        },
        body: {
          text: value?.question,
        },
      };
    case 'text':
      return {
        type: type,
        body: {
          text: value?.question,
        },
      };
    default:
      break;
  }
};


export const quickReplayDataFormating = (data, buttonList) => {
  let btnlist = [];
  buttonList?.map(i => {
    btnlist.push({
      type: 'reply',
      reply: {
        id: generateId(),
        title: i?.value,
      },
    });
  });
  let componentBody = {
    type: 'button',
    body: {
      text: data?.question,
    },
    footer: {
      text: data?.Footer_input_value,
    },
    header: {
      text: data?.hearder_text_value,
    },
    action: {
      buttons: btnlist,
    },
  };
  return componentBody;
};

export const callToActionFormat = data => {
  let componentBody = {
    type: 'button',
    body: {
      text: data?.question,
    },
    footer: {
      text: data?.Footer_input_value,
    },
    header: {
      text: data?.hearder_text_value,
    },
    action: {
      buttons: [
        {
          type: 'PHONE_NUMBER',
          text: 'call now',
          phone_number: '+917010774098',
        },
        {
          type: 'URL',
          text: 'Go to website',
          url: 'https://www.google.com/',
        },
      ],
    },
  };
  return componentBody;
};

export const listDataFormating = (heraderType,data, list,mediaFile) => {
  let btnlist = [];
  list?.map(i => {
    btnlist.push({
      title: i.value,
      rows: childRow(i?.children),
    });
  });
  let componentBody = {
    type: 'list',
    body: {
      text: data?.question,
    },
    footer: {
      text: data?.Footer_input_value,
    },
    header: {
      type:'text',
      text: data?.hearder_text_value,
    },
    action: {
        button: data?.list_button_text,
        sections: btnlist,
    },
  };
  return componentBody;
};

const childRow = data => {
  let btnlist = [];
  data?.map(i => {
    btnlist.push({ id: i?.id, title: i?.value });
  });
  return btnlist;
};

export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const hasDuplicateName = (arr) => {
  return arr.some((item, index) =>
      arr.slice(index + 1).some(elem => elem?.value?.toLowerCase() === item?.value?.toLowerCase())
  );
};


export const hasDuplicateOptionName = nestedObj => {
  return nestedObj.some(obj =>
      obj.children.some((item, index) =>
          obj.children.slice(index + 1).some(elem => elem?.value?.toLowerCase() === item?.value?.toLowerCase())
      )
  );
};
