import React from 'react';
import { DragDropContext } from '@hello-pangea/dnd';

const DragDropProvider = ({ children, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
};

export default DragDropProvider;
