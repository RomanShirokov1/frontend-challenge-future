import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader: React.FC = (props) => (
  <ContentLoader
    speed={2}
    width={331}
    height={201}
    viewBox="0 0 331 201"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="8" ry="8" width="330" height="200" />
  </ContentLoader>
);

export default MyLoader;
