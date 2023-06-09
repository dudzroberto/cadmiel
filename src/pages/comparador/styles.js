import styled, { css } from 'styled-components';
import { Button } from 'react-bootstrap';

export const Header = styled.div`
  background-color: #000;
  ${css`
    .row {
      height: 150px;
    }

    .col {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `}
`;

export const Content = styled.div`
  padding: 60px 0 0 0;

  h1 {
    color: #f5ae13;
    font-weight: 900;
  }

  ${css`
    .form-label {
      font-weight: 600;
    }
  `}
`;

export const NewButton = styled(Button)`
  width: 100%;
`;

