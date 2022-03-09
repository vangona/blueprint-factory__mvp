import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Input = styled.input`
  height: 1.75rem;
  padding: 10px 5px;
  box-sizing: border-box;
  font-family: SsurroundAir;
`;

const ValueInput = ({ value, setValue }) => {
  const onChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <Container>
      <Input type='text' value={value} onChange={onChange} />
    </Container>
  );
};

export default ValueInput;