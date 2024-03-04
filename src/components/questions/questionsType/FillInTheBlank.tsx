import { QuestionResponse } from "@/types/question";
import { Box, Divider, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";
interface Props {
  data: QuestionResponse;
  show: boolean;
}
const FillInTheBlank = ({ data, show }: Props) => {
  const correctAnswersMetadata: string[] = JSON.parse(
    data.correctAnswersMetadata.replaceAll("'", '"')
  );
  // console.log(data.correctAnswersMetadata);
  return (
    <Paper px="xl" py="xs" shadow="xs">
      {/* <Text>{data.content}</Text> */}
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      {show && (
        <Divider
          my="sm"
          variant="dashed"
          labelPosition="left"
          label={
            <>
              <Box ml={5}>Answer</Box>
            </>
          }
        />
      )}
      {show && <Text>{correctAnswersMetadata[0]} </Text>}
    </Paper>
  );
};

export default FillInTheBlank;
