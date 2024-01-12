import { Title } from "@mantine/core";
import { Head } from "next/document";

export default function Home() {
  return (
    <>
      <Head>
        <title>Qizz Admin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Title>Hello, World!</Title> {/* Example usage of the Title component */}
    </>
  );
}
