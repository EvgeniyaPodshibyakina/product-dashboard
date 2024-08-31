import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './LatestComments.scss';

const LatestComments: React.FC<{ comments: { author: string, text: string }[] }> = ({ comments }) => {
  // Разбиваем комментарии на две колонки
  const half = Math.ceil(comments.length / 2);
  const firstColumn = comments.slice(0, half);
  const secondColumn = comments.slice(half);

  return (
    <div className="LatestComments">
      <h2>
        Comments
      </h2>
      <div className="comments-columns">
        <List>
          {firstColumn.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={comment.author} 
                secondary={comment.text} 
              />
            </ListItem>
          ))}
        </List>
        <List>
          {secondColumn.map((comment, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={comment.author} 
                secondary={comment.text} 
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default LatestComments;