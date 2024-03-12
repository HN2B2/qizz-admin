import { ActionIcon, Group, TextInput, rem } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react";
import { CiSearch } from "react-icons/ci";

const NotificationSearch=()=>{
    return(
        <Group gap="3px" wrap="nowrap">
      <TextInput
        placeholder="Search"
        size="xs"
        w={600}
        leftSection={
          <IconSearch
            style={{ width: rem(12), height: rem(12) }}
            stroke={1.5}
          />
        }
        rightSectionWidth={70}
        styles={{ section: { pointerEvents: "none" } }}
        mb="md"
        // value={searchKeyword}
        // onChange={(e) => setSearchKeyword(e.currentTarget.value)}
      />
      <ActionIcon mb={"md"} >
        <CiSearch />
      </ActionIcon>
    </Group>
    )
}
export default NotificationSearch