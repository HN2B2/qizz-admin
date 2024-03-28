import { QuestionResponse } from "@/types/question"
import { QuestionType } from "@/types/question/QuestionType"
import { Button, Flex, Group, Paper, Stack, Text } from "@mantine/core"
import { IconCircleCheck, IconClock } from "@tabler/icons-react"
import React from "react"
import MultipleChoice from "./questionsType/MultipleChoice"
import FillInTheBlank from "./questionsType/FillInTheBlank"

const ViewQuestionPaper = ({
    question,
    index,
    show,
}: {
    question: QuestionResponse
    index: number
    show: boolean
}) => {
    const QuestionTypes: Record<QuestionType, React.ReactNode> = {
        [QuestionType.MULTIPLE_CHOICE]: (
            <MultipleChoice data={question} show={show} />
        ),
        [QuestionType.FILL_IN_THE_BLANK]: (
            <FillInTheBlank data={question} show={show} />
        ),
    }
    const questionType: QuestionType =
        QuestionType[question.type as keyof typeof QuestionType]

    return (
        <Paper p="lg" radius="md" shadow="sm" mb="md">
            <Stack gap={20}>
                <Flex justify="space-between">
                    <Text>
                        {index}. {question.type}
                    </Text>
                    <Flex justify={"space-between"}>
                        <Stack justify="space-between">
                            <Group gap="sm" justify="flex-end">
                                <Button
                                    variant="default"
                                    leftSection={<IconClock size={14} />}
                                >
                                    {question.duration} seconds
                                </Button>
                                <Button
                                    variant="default"
                                    leftSection={<IconCircleCheck size={14} />}
                                >
                                    {question.point} points
                                </Button>
                            </Group>
                        </Stack>
                    </Flex>
                </Flex>
            </Stack>
            {QuestionTypes[questionType]}
        </Paper>
    )
}

export default ViewQuestionPaper
