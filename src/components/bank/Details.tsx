import { QuestionResponse } from "@/types/question";
import { instance } from "@/utils";
import { ScrollArea, Title, Text, Group, Card, Box } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useEffect } from "react";
import ViewQuestionPaper from "../questions/ViewQuestionPaper";
function Details({ bankId }: { bankId: number }) {
  const [questions, questionsHandler] = useListState<QuestionResponse>([]);
  const fetchData = async () => {
    try {
      const data: QuestionResponse[] = await instance
        .get(`question/all/bankId/${bankId}`)
        .json();
      questionsHandler.setState(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (bankId != 0) fetchData();
  }, [bankId]);
  console.log(bankId);
  return (
    <>
      <ScrollArea w={"100%"}>
        {bankId == 0 ? (
          <></>
        ) : (
          questions.map((question, index) => (
            <ViewQuestionPaper
              key={question.questionId}
              index={index}
              question={question}
              show={true}
            />
          ))
        )}
      </ScrollArea>
    </>
  );
}

export default Details;
