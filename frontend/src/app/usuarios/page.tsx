"use client";
import { Button, Table, TablePaginationConfig } from "antd";
import { ColumnsType, FilterValue } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { IUserInterface } from "./user.interface";
import { Direction } from "@/enum/direction.enum";
import { listUsers } from "@/services/UserService";
import { List } from "@/interfaces/list.interface";
import CreateUserDrawer from "@/components/CreateUserDrawer";

const INITIAL_PAGE_SIZE = 5;
const columns: ColumnsType<IUserInterface> = [
  {
    title: "ID",
    dataIndex: "id",
    sorter: true,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    sorter: true,
  },
  {
    title: "Correo electronico",
    dataIndex: "email",
    sorter: true,
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    sorter: true,
  },
];

export default function Users() {
  const [page, setPage] = useState({
    pageSize: INITIAL_PAGE_SIZE,
    limit: INITIAL_PAGE_SIZE,
    skip: 0,
    total: 0,
  });
  const [users, setUsers] = useState<IUserInterface[]>([]);

  const fetch = (params: List): void => {
    listUsers(params).then(({ data }) => {
      setUsers(data.users);
      setPage({ ...page, total: data.total });
    });
  };

  const onSave = (user: IUserInterface) => {
    setUsers([...users, user]);
  };
  useEffect(() => {
    fetch({ take: page.limit, skip: page.skip });
  }, []);

  const onTableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: any
  ) => {
    console.log("pagination", pagination);
    const temporalPage = {
      pageSize: pagination.pageSize as number,
      limit: page.limit,
      skip:
        ((pagination.current as number) - 1) * (pagination.pageSize as number),
      total: page.total,
    };

    console.log("temporalPage", temporalPage);

    setPage(temporalPage);

    fetch({
      take: temporalPage.limit,
      skip: temporalPage.skip,

      sortField: sorter.field,
      sortOrder:
        sorter.order === "ascend" ? Direction.ASCENDANT : Direction.DESCENDANT,
    });
  };
  return (
    <>
      <CreateUserDrawer onSave={onSave} />
      <Table
        columns={columns}
        dataSource={users}
        onChange={onTableChange}
        pagination={page}
      />
    </>
  );
}
