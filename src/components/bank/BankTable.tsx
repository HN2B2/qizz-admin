import React from "react";
import { Card, Grid, ScrollArea, Title, Image, Text } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

// Assuming this is your Bank type
type Bank = {
  name: string;
  description: string;
  numberOfQuestions: number;
  imageUrl: string;
};

// Mock data for demonstration
const mockBankData: Bank[] = Array.from({ length: 10 }, (_, index) => ({
  name: `Bank ${index + 1}`,
  description: `Description for Bank ${
    index + 1
  }. This is a longer text to simulate a real description.`,
  numberOfQuestions: (index + 1) * 10, // Just an example to vary the number
  imageUrl:
    "https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80", // Using the same image for simplicity
}));

const BankTable = () => {
  return (
    <>
      <Title size="md">Results ({mockBankData.length})</Title>{" "}
      <ScrollArea style={{ height: 450 }} type="scroll">
        {mockBankData.map((bank, index) => (
          <Card
            key={index}
            shadow="sm"
            component="a"
            target="_blank"
            m="5px"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            <Grid>
              <Grid.Col span={4}>
                <Card.Section p={"sm"}>
                  <Image
                    src={bank.imageUrl}
                    width={90}
                    height={90}
                    alt={`Bank ${index + 1}`}
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
                    <IconMenu2 size="1rem" stroke={1.5} /> Number of Questions:{" "}
                    {bank.numberOfQuestions}
                  </Text>
                </Card.Section>
              </Grid.Col>
            </Grid>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
};

export default BankTable;
