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
} from "@mantine/core";
import { IconMenu2, IconTrash } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { instance } from "@/utils"; // Ensure this import path is correct
import { BankDataContext } from "@/pages/bank";
import { Bank } from "@/types/bank";
// Assuming useModals is the correct way to use Mantine modals
import { useModals } from "@mantine/modals";
import BankPagination from "./BankPagination";
import { Details } from ".";

const BankTable = () => {
  const { bankList, handlers, total } = useContext(BankDataContext); // Now destructuring setBankList as well
  const modals = useModals(); // Correct usage of modals
  const [bankId, setBankId] = useState<number>(bankList[0]?.quizBankId || 0);

  const handleDeleteBank = async (bankId: number) => {
    try {
      await instance.delete(`/manageBanks/${bankId}`);
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
      <Stack>
        <Title size="md">Results ({total})</Title>
        <Grid w={"100%"}>
          <Grid.Col span={5}>
            <ScrollArea w={"100%"} type="scroll">
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
                  // onMouseLeave={() => {}}
                >
                  <Grid>
                    <Grid.Col span={4}>
                      <Card.Section p={"sm"}>
                        <Image
                          src={bank.imgURL || defaultImageUrl}
                          width={90}
                          height={90}
                          alt={`Bank ${bank.name}`}
                          radius={"sm"}
                        />
                      </Card.Section>
                    </Grid.Col>

                    <Grid.Col span={8}>
                      <Card.Section>
                        <Text size="md" w={200} lineClamp={1}>
                          {bank.name}
                        </Text>
                        <Text mt="xs" color="dimmed" size="sm" lineClamp={2}>
                          {bank.description}
                        </Text>
                        <Text mt="xs" size="sm">
                          <IconMenu2 size="1rem" stroke={1.5} /> Number of
                          Questions: {bank.totalQuestions}
                        </Text>
                      </Card.Section>
                      <Card.Section>
                        <Group>
                          <Button
                            variant="light"
                            onClick={() =>
                              showConfirmDeleteBank(bank.quizBankId)
                            }
                          >
                            <IconTrash />
                          </Button>
                        </Group>
                      </Card.Section>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))}
            </ScrollArea>
          </Grid.Col>
          <Grid.Col span={7}>
            <Details bankId={bankId} />
          </Grid.Col>
        </Grid>
      </Stack>

      <BankPagination total={Math.ceil(total / 2)} />
    </>
  );
};

export default BankTable;
