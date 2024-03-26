import { QuestionResponse } from "@/types/question";
import { instance } from "@/utils";
import { ScrollArea, Title, Text, Group, Card, Box } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import React, { useEffect } from "react";
import ViewQuestionPaper from "../questions/ViewQuestionPaper";

// interface Answer {
//   id: string;
//   text: string;
//   isCorrect?: boolean; // Optional because it won't exist on fill-in-the-blank answers
// }

// interface Question {
//   id: number;
//   type: "multiple" | "fill";
//   question: string;
//   points: number;
//   time: number;
//   answers?: Answer[]; // Optional because fill-in-the-blank questions won't have this
//   answer?: string; // For fill-in-the-blank questions
// }

// const mockQuestions = [
//   {
//     id: 1,
//     type: "multiple",
//     question: "What is the capital of France?",
//     points: 5,
//     time: 30, // seconds
//     answers: [
//       { id: "a", text: "Paris", isCorrect: true },
//       { id: "b", text: "London", isCorrect: false },
//       { id: "c", text: "Berlin", isCorrect: false },
//       { id: "d", text: "Madrid", isCorrect: false },
//     ],
//   },
//   {
//     id: 2,
//     type: "fill",
//     question: "Complete the following sentence: The cat sat on the ____.",
//     points: 3,
//     time: 15, // seconds
//     answer: "mat", // Correct answer for fill-in-the-blank
//   },
//   // Add more questions as needed
// ];

function Details({ bankId }: { bankId: number }) {
  const [questions, questionsHandler] = useListState<QuestionResponse>([]);
  const fetchData = async () => {
    try {
      const { data } = await instance.get(`/question/all/bankId/${bankId}`);
      questionsHandler.setState(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (bankId != 0) fetchData();
  }, [bankId]);
  console.log(bankId);

  // Ensure 'answer' parameter is typed correctly
  // const renderAnswer = (answer: Answer | string, type: "multiple" | "fill") => {
  //   if (type === "multiple" && typeof answer !== "string") {
  //     return (
  //       <Text key={answer.id} fw={answer.isCorrect ? "bold" : "normal"}>
  //         {answer.text}
  //       </Text>
  //     );
  //   }
  //   // For fill-in-the-blank, the answer is displayed directly
  //   if (type === "fill" && typeof answer === "string") {
  //     return <Text key="fill-answer">{answer}</Text>;
  //   }
  // };

  return (
    <>
      {/* <Title size="md">Quiz Questions</Title> */}
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
