import React, { useState } from 'react';
import styled from 'styled-components';

import { Annotations } from './components/Annotations/Annotations'
import { Coord } from './types';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const App = () => {
  const [coords, setCoords] = useState<Coord>({ x: 0, y: 0 });

  const handleMouseMove = (ev: React.MouseEvent) => {
    const { pageX: x, pageY: y } = ev;
    setCoords({ x, y });
  };

  return (
    <Container onMouseMove={handleMouseMove}>
      <Annotations coord={coords} />
    </Container>
  );
};

export default App;
