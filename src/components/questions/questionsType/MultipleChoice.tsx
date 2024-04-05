import { QuestionResponse } from "@/types/question"
import { renderHTML } from "@/utils"
import {
    Box,
    Divider,
    Paper,
    SimpleGrid,
    Text,
    TypographyStylesProvider,
} from "@mantine/core"
import { IconCheck, IconX } from "@tabler/icons-react"
import React from "react"

interface Props {
    data: QuestionResponse
    show: boolean
}
const MultipleChoice = ({ data, show }: Props) => {
    const answersMetadata: string[] = JSON.parse(
        data.answersMetadata.replaceAll("'", '"')
    )
    const correctAnswersMetadata: string[] = JSON.parse(
        data.correctAnswersMetadata.replaceAll("'", '"')
    )
    return (
        <Paper px="xl" py="xs" shadow="xs">
            <TypographyStylesProvider>
                <div
                    dangerouslySetInnerHTML={{
                        __html: renderHTML(data.content),
                    }}
                ></div>
            </TypographyStylesProvider>
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
            {show ? (
                <SimpleGrid cols={2} verticalSpacing="sm">
                    {answersMetadata.map((answer, index) => (
                        <Box my={0} display={"flex"} key={index}>
                            {correctAnswersMetadata.includes(answer) ? (
                                <IconCheck
                                    height={"100%"}
                                    color="green"
                                    size={14}
                                ></IconCheck>
                            ) : (
                                <IconX
                                    height={"100%"}
                                    color="red"
                                    size={14}
                                ></IconX>
                            )}
                            <Text>{answer}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <SimpleGrid cols={2} verticalSpacing="sm">
                    {answersMetadata.map((answer, index) => (
                        <Box my={0} display={"flex"} key={index}>
                            <Text>{answer}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            )}
        </Paper>
    )
}

export default MultipleChoice
