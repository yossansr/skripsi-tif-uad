/* eslint-disable no-shadow */
import React from 'react';
import { Tooltip, Button } from 'antd';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import samplePDF from '../../assets/sample.pdf';
import './Home.styles.css';

export default function Home() {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const previousePage = () => {
    setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <Document file={samplePDF} options={{ workerSrc: '/pdf.worker.js' }} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="pdf-nav">
        <Tooltip title="previous">
          <Button disabled={pageNumber === numPages - (numPages - 1)} onClick={previousePage} className="previous" type="primary" size="small" shape="circle" icon={<LeftOutlined />} />
        </Tooltip>
        <div className="info">
          {pageNumber}
          {' '}
          of
          {' '}
          {numPages}
        </div>
        <Tooltip title="next">
          <Button disabled={pageNumber === numPages} onClick={nextPage} className="next" type="primary" size="small" shape="circle" icon={<RightOutlined />} />
        </Tooltip>
      </div>
    </div>
  );
}
