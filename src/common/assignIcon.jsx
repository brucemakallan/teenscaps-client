import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFile, faFilePdf, faFileWord, faFileArchive,
} from '@fortawesome/free-solid-svg-icons';

const fileIcons = {
  default: {
    type: 'default',
    icon: <FontAwesomeIcon icon={faFile} className="file-icon" title="file" />,
  },
  pdf: {
    type: 'pdf',
    icon: <FontAwesomeIcon icon={faFilePdf} className="file-icon" title="file" />,
  },
  word: {
    type: 'doc',
    icon: <FontAwesomeIcon icon={faFileWord} className="file-icon" title="file" />,
  },
  wordOther: {
    type: 'docx',
    icon: <FontAwesomeIcon icon={faFileWord} className="file-icon" title="file" />,
  },
  archive: {
    type: 'zip',
    icon: <FontAwesomeIcon icon={faFileArchive} className="file-icon" title="file" />,
  },
  archiveOther: {
    type: 'rar',
    icon: <FontAwesomeIcon icon={faFileArchive} className="file-icon" title="file" />,
  },
};

const assignIcon = (filePath) => {
  let fileIcon;
  Object.keys(fileIcons).map((key) => {
    if (filePath && filePath.toLowerCase().endsWith(fileIcons[key].type)) {
      const { icon } = fileIcons[key];
      fileIcon = icon;
    }
    return fileIcon;
  });
  if (fileIcon) {
    return fileIcon;
  }
  return fileIcons.default.icon;
};

export default assignIcon;
