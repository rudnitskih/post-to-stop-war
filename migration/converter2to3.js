
const converter = (initialData) => {
  return initialData.map(({fields}) => fields)
    .reduce((acc, row) => {
      const date = row['Date'];

      if (!acc[date]) {
        acc[date] = {
          Tags: [],
          Poster: [],
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
        const currentAttachmentNames = group['Poster'].map((url) => url.split('/').at(-1))

        if (!currentAttachmentNames.includes(attachmentName)) {
          group['Poster'].push(attachmentUrl);
        }
      } catch (e) {
        console.log('Error', e);
        console.log('Item', row);
      }

      return acc;
    }, {})
}

module.exports = converter;


