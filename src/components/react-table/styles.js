import styled from "styled-components";
import { lighten } from 'polished';

export const ReactTable = styled.table`
  thead {
    tr {
      th {
        background: ${lighten(0.05, '#FFCD64')};
        font-weigth: 600;

        &:nth-last-child(1) {
          text-align: center;
        }

        &:nth-last-child(8) {
          text-align: center;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        &.even-row {
          background-color: #EEE;
        }
        &:nth-last-child(1) {
          text-align: center;
        }
        &:nth-last-child(8) {
          text-align: center;
        }
      }
    }
  }
`;

export const ReactTableButtonTrash = styled.button`
  border: none;
  background-color: transparent;
`;
