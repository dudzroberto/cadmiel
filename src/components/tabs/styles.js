import styled from 'styled-components';
import { Tabs } from 'react-bootstrap';

export const StyledTabs = styled(Tabs)`
  .nav-link.active {
    background-color: #f5ae13;
    border-color: #f5ae13;
    color: #000;
    font-weight: 600;
  }
  
  .nav-link:hover {
    background-color: #f5ae13;
    border-color: #f5ae13;
    color: #000;
    font-weight: 600;
  }

  .nav-link,
  .nav-link:focus,
  .nav-link:visited {
    color: #000;
  }
`;

export const ButtonRightContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;

  button {
    padding-right: 50px;
    padding-left: 50px;
  }
`;
