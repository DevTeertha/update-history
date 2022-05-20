import { css } from '@emotion/react';
import ClockLoader from 'react-spinners/ClockLoader';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {
  return (
    <div className='loaderContainer'>
      <div className='loaderbody'>
          <ClockLoader color={'#fff'} css={override} size={150} />
      </div>
    </div>
  );
};

export default Loader;
