import React from 'react';
import { Box } from '@mui/material';

interface RichTextContentProps {
  content: string;
  className?: string;
}

export const RichTextContent: React.FC<RichTextContentProps> = ({ content, className }) => {
  return (
    <Box 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
      sx={{
        fontSize: '1rem',
        lineHeight: 1.7,
        color: 'rgba(0, 0, 0, 0.87)',
        '& p': { mb: 2 },
        '& ul': { pl: 3, mb: 2 },
        '& li': { mb: 1 }
      }}
    />
  );
}; 