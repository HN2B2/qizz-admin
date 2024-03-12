import { BreadCrumbsItem, MainLayout } from "@/components/layouts";
import { CreateNotificationBtn, NotificationSearch, NotificationTable } from "@/components/manageNotification";
import { Container, Flex, Group, Paper, ScrollArea } from "@mantine/core";

const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Home", link: "/" },
  { title: "Notification", link: "/notification" },
];

const NotificationPage = () => {
  return (
    <MainLayout title="Notification" breadcrumbs={breadcrumbsItems}>
       <ScrollArea>
                    <Container size={"xl"} mt={"md"}>
                        <Paper p={"md"} shadow="sm" my={"md"}>
                            <Flex
                                justify="space-between"
                                gap="lg"
                                px={"md"}
                                mt={"md"}
                            >
                                <NotificationSearch/>
                                <Group mb="md">
                                    <CreateNotificationBtn/>
                                </Group>
                            </Flex>
                            
                        </Paper>
                        <Paper p={"md"} shadow="sm">
                            <NotificationTable/>
                        </Paper>

                        <Paper p={"md"} shadow="sm">
                            <Group justify="center">
                                
                            </Group>
                        </Paper>
                    </Container>
                </ScrollArea>
    </MainLayout>
  );
};

export default NotificationPage;
