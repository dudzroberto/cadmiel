import styled, { css } from 'styled-components';
import { lighten } from 'polished';

export const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

export const Content = styled.div`
  width: 50%;

  a {
    background-color: #f5ae13;
    padding: 10px 30px;
    font-weight: 600 !important;
    text-decoration: none;
    color: #000;
    margin: 0 15px;
    border-radius: 0.375rem;
  
    &:hover {
      background-color: ${lighten(0.1, '#f5ae13')};
    }
  }

  ${css`
    .remove-padding {
      padding: 0 !important;
    }
  `}

  img {
    width: 65%;
    max-width: 350px;
  }
`;

