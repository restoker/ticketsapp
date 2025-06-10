import { ColumnDef } from '@tanstack/react-table';

export type Agent = {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  tickets: number;
  lastLogin: string;
};

export type DataTableProps = {
  columns: ColumnDef<Agent>[];
  data: Agent[];
};
