import DeleteBtn from 'components/btn/DeleteBtn';
import React from 'react';
import styled from 'styled-components';

const Container = styled.ul``;

const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.span``;

const ValueList = ({ arr, setArr }) => {
  return (
    <Container>
      {arr.map((value, index) => 
        <Item key={index}>
          <Content>
            {value}
          </Content>
          <DeleteBtn removeIndex={index} arr={arr} setArr={setArr} size='small' />
        </Item>)
      }
    </Container>
  );
};

export default ValueList;