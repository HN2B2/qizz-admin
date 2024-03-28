import React, { useContext, useState } from "react";
import {
  Card,
  Grid,
  ScrollArea,
  Title,
  Image,
  Text,
  Button,
  Group,
  Stack,
  Center,
  ActionIcon,
  Avatar,
} from "@mantine/core";
import { IconTrash, IconX, IconMenu2 } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { instance } from "@/utils"; // Ensure this import path is correct
import { BankDataContext } from "@/pages/bank";
import { Bank } from "@/types/bank";
// Assuming useModals is the correct way to use Mantine modals
import { useModals } from "@mantine/modals";
import BankPagination from "./BankPagination";
import { Details } from ".";
import { log } from "console";

const BankTable = () => {
  const { bankList, handlers, total } = useContext(BankDataContext); // Now destructuring setBankList as well
  const modals = useModals(); // Correct usage of modals
  const [bankId, setBankId] = useState<number>(bankList[0]?.quizBankId || 0);

  const handleDeleteBank = async (bankId: number) => {
    try {
      await instance.delete(`manageBanks/${bankId}`);
      console.log(bankId);
      handlers.setState((currentList: any[]) =>
        currentList.filter((bank) => bank.id !== bankId)
      );
      showNotification({
        color: "teal",
        title: "Success",
        message: "Bank deleted successfully",
      });
    } catch (error) {
      console.error(error);
      showNotification({
        color: "red",
        title: "Error",
        message: "Failed to delete bank",
      });
    }
  };

  const showConfirmDeleteBank = (bankId: number) => {
    console.log(bankId);

    modals.openConfirmModal({
      title: "Delete bank",
      children: "Are you sure you want to delete this bank?",
      labels: {
        confirm: "Delete",
        cancel: "Cancel",
      },
      onCancel: () => {},
      onConfirm: () => handleDeleteBank(bankId),
    });
  };

  const defaultImageUrl =
    "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWge&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80";

  const handleOnMouseEnter = (bankId: number) => {
    setBankId(bankId);
  };

  return (
    <>
      <Title size="md">Results ({total})</Title>
      <Grid w={"100%"} justify="space-between">
        <Grid.Col span={5} w={"100%"}>
          {/* <ScrollArea w={"100%"} type="scroll">
              
            </ScrollArea> */}
          {bankList.map((bank) => (
            <Card
              key={bank.quizBankId || bank.name} // Using a unique property from bank
              shadow="sm"
              component="a"
              target="_blank"
              m="5px"
              onMouseEnter={() => {
                handleOnMouseEnter(bank.quizBankId);
              }}
              // w={"100%"}
              onMouseLeave={() => {
                setBankId(0);
              }}
            >
              <Card.Section p={"sm"}>
                <Grid>
                  <Grid.Col span={3}>
                    <Center>
                      <Image
                        src={bank.featuresImage || defaultImageUrl}
                        // w="auto"
                        w="100%"
                        fit="contain"
                        alt={`Bank ${bank.name}`}
                        radius={"sm"}
                      />
                    </Center>
                  </Grid.Col>

                  <Grid.Col span={9} p={"sm"}>
                    <Group justify="space-between">
                      <Title order={4} lineClamp={1}>
                        {bank.name}
                      </Title>
                      <ActionIcon
                        bg={"red"}
                        color={"white"}
                        size={"sm"}
                        onClick={() => showConfirmDeleteBank(bank.quizBankId)}
                      >
                        <IconX></IconX>
                      </ActionIcon>
                    </Group>

                    <Text mt="xs" c="dimmed" size="sm" lineClamp={2}>
                      {bank.description}
                    </Text>
                    <Group justify="space-between">
                      <Group>
                        <IconMenu2 size="1rem" stroke={1.5} />
                        <Text>
                          {bank.totalQuestions ? bank.totalQuestions : 0}{" "}
                          Questions
                        </Text>
                      </Group>
                      <Group>
                        <Text>
                          {bank.subCategories?.length ? "Subcategories: " : ""}
                          {bank.subCategories
                            ? bank.subCategories.map((sc) => sc.name).join(", ")
                            : ""}
                        </Text>
                      </Group>
                    </Group>
                    <Group>
                      <Avatar alt="it's me" />
                      <Text>{bank.createdBy.displayName}</Text>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Card.Section>
            </Card>
          ))}
        </Grid.Col>
        <Grid.Col span={7} w={"100%"}>
          <Details bankId={bankId} />
        </Grid.Col>
      </Grid>

      <Center w={"100%"}>
        <BankPagination total={Math.ceil(total / 2)} />
      </Center>
    </>
  );
};

export default BankTable;
