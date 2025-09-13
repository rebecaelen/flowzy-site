import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton
} from '@mui/material';
import {
  Folder,
  FolderOpen,
  InsertDriveFile,
  ExpandMore,
  ChevronRight
} from '@mui/icons-material';

const FileExplorer = ({ files, onFileSelect }) => {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (path) => {
    setOpenFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderTree = (items, level = 0) => {
    return items.map((item) => (
      <div key={item.path}>
        <ListItem 
          sx={{ pl: level * 3 }}
          onClick={() => item.type === 'file' ? onFileSelect(item) : toggleFolder(item.path)}
          style={{ cursor: 'pointer' }}
        >
          {item.type === 'folder' && (
            <IconButton size="small">
              {openFolders[item.path] ? <ExpandMore /> : <ChevronRight />}
            </IconButton>
          )}
          {item.type === 'folder' ? (
            openFolders[item.path] ? <FolderOpen color="primary" /> : <Folder color="primary" />
          ) : (
            <InsertDriveFile color="secondary" />
          )}
          <ListItemText primary={item.name} sx={{ ml: 1 }} />
        </ListItem>
        
        {item.type === 'folder' && item.children && (
          <Collapse in={openFolders[item.path]} timeout="auto">
            <List component="div" disablePadding>
              {renderTree(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };

  return (
    <List>
      {renderTree(files)}
    </List>
  );
};

export default FileExplorer;