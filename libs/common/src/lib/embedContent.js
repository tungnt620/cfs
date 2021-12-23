import React from 'react';

const youtubeSubLinkRegex = /[^\s]*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^\s#&?]*)/g;
const youtubeLinkRegex = /^[^\s]*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^\s#&?]*)/;

export function addYoutubeEmbed(content) {
  const result = [];
  let newContent = content;
  const youtubeLinks = newContent.match(youtubeSubLinkRegex);

  if (youtubeLinks?.length) {
    let index = 0;
    for (const youtubeLink of youtubeLinks) {
      const videoId = youtubeLink.match(youtubeLinkRegex)[2];
      const embedLink = `https://www.youtube.com/embed/${videoId}`;

      if (newContent) {
        const [firstParagraph, ...remain] = newContent.split(youtubeLink);

        newContent = remain.join('\n');
        result.push(firstParagraph);
        result.push(
          <div
            key={`video-${videoId}-${index}`}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <iframe
              style={{ width: '400px', height: '315px' }}
              src={embedLink}
              allowFullScreen
            />
          </div>
        );
      }

      ++index;
    }
  } else {
    result.push(newContent);
  }

  return result;
}
