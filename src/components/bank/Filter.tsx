import React from "react";
import { Checkbox, Divider, NavLink, ScrollArea, Title } from "@mantine/core";

const Filter = () => {
  return (
    <>
      <Title size="md">Filter</Title>
      <ScrollArea style={{ height: 200 }}>
        <NavLink
          href="#required-for-focus"
          label="Number of Questions"
          // childrenOffset={10}
          defaultOpened
        >
          <Checkbox label="00 - 10" mb={5} />
          <Checkbox label="11 - 20" mb={5} />
          <Checkbox label="21 - 30" mb={5} />
          <Checkbox label="31 - 40" mb={5} />
          <Checkbox label="41+" />
        </NavLink>
        <Divider mt="xs" mb="sm" color={"gray"} />
      </ScrollArea>
    </>
  );
};

export default Filter;
