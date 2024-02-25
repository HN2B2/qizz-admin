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
          childrenOffset={10}
        >
          <Checkbox label="0 - 10" labelPosition="right" />
          <Checkbox label="11 - 20" />
          <Checkbox label="21 - 30" />
          <Checkbox label="31 - 40" />
          <Checkbox label="41+" />
        </NavLink>
        <Divider mt="xs" mb="sm" color={"gray"} />

        {/* Types of Question Section */}
        <NavLink
          href="#required-for-focus"
          label="Types of Questions"
          childrenOffset={10}
        >
          <Checkbox label="Multiple Choice" labelPosition="right" />
          <Checkbox label="Fill in the blank" />
        </NavLink>
        <Divider mt="xs" mb="sm" color={"gray"} />
      </ScrollArea>
    </>
  );
};

export default Filter;
