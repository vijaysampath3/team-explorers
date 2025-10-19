declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface AutoTableOptions {
    startY?: number;
    head?: any[][];
    body?: any[][];
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: {
      fillColor?: number[];
      textColor?: number[];
      fontSize?: number;
    };
    margin?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
    styles?: any;
    columnStyles?: any;
    didDrawPage?: (data: any) => void;
  }

  function autoTable(doc: jsPDF, options: AutoTableOptions): void;

  export default autoTable;

  declare module 'jspdf' {
    interface jsPDF {
      lastAutoTable: {
        finalY: number;
      };
    }
  }
}
