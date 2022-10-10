const fs = require('fs');

let result = require('./10_10_2022.json')
  .map(({fields}) => fields)
  .reduce((acc, row) => {
    const date = row['Date'];

    if (!acc[date]) {
      acc[date] = {
        Tags: [],
        Attachment: [],
      };
    }

    const group = acc[date];

    try {
      group[row['Language']] = row['Message'];

      row['Tags'].forEach((tag) => {
        if (!group['Tags'].includes(tag)) {
          group['Tags'].push(tag);
        }
      });

      const attachmentUrl = row['Attachment'][0].url;
      const attachmentName = attachmentUrl.split('/').at(-1);
      const currentAttachmentNames = group['Attachment'].map((url) => url.split('/').at(-1))

      if (!currentAttachmentNames.includes(attachmentName)) {
        group['Attachment'].push(attachmentUrl);
      }
    } catch (e) {
      console.log('Error', e);
      console.log('Item', row);
    }

    return acc;
  }, {});

Object.entries(result).forEach(([date, data]) => {
  fs.writeFileSync(`${__dirname}/byDate/${date}.json`, JSON.stringify(data, null, 2));

})


// const tags = Object.entries(result).filter(([date, messageTags]) => {
//   return messageTags.some((messageTag) => JSON.stringify(messageTags[0]) !== JSON.stringify(messageTag))
// });
//
// fs.writeFileSync(`${__dirname}/tags.json`, JSON.stringify(tags, null, 2));



