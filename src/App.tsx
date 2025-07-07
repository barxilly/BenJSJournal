import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import {
  Card,
  Center,
  Grid,
  MantineProvider,
  Rating,
  Space,
  Stack,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import { useState } from "react";

function App() {
  const [date, setDate] = useState<string | null>((new Date().toISOString().split("T")[0]).toString())

  return (
    <MantineProvider defaultColorScheme="auto">
      <Center
        className="appcon"
        style={{
          width: "100vw",
          paddingTop: "2em",
          paddingBottom: 0,
          paddingLeft: "1em",
          paddingRight: "1em",
        }}
      >
        <Stack
          align="center"
          justify="center"
          style={{ width: "100%", maxWidth: 800 }}
        >
          <div style={{ textAlign: "center" }}>
            <Title className="title">BenJS Journal</Title>
            <Title order={4}>
              I'm aware how big-headed naming apps after myself is
            </Title>
          </div>
          <Space h="lg" />
          <Grid
            justify="center"
            align="stretch"
            style={{ width: "100%", minHeight: "60vh" }}
          >
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Card
                padding="lg"
                radius="lg"
                withBorder
                style={{ width: "100%", height: "60vh" }}
              >
                <Center>
                  <DatePicker 
                    size="lg"
                    
                    style={{ width: "100%", height: "100%" }}
                    firstDayOfWeek={1}
                    hideOutsideDates
                    defaultValue={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={setDate}
                  />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Stack style={{ height: "60vh" }} gap="md">
                <TextInput
                  placeholder="Title your entry"
                  variant="default"
                  size="md"
                  radius="lg"
                  style={{ width: "100%", fontSize: "16px" }}
                  disabled={!(date == (new Date().toISOString().split("T")[0]).toString())}
                />
                <Textarea
                  placeholder={
                    [
                    "Write your thoughts here...",
                      "What happened today?",
                      "How do you feel?",
                      "What are you grateful for?",
                      "What did you learn today?",
                      "What challenges did you face?",
                      "What made you happy today?",
                      "What are your goals for tomorrow?",
                      "Reflect on your day.",
                      "Describe a memorable moment.",
                    ][Math.floor(Math.random() * 10)]
                    
                  }
                  autosize
                  minRows={8}
                  variant="default"
                  size="md"
                  radius="lg"
                  style={{
                    width: "100%",
                    fontSize: "16px",
                    lineHeight: 1.6,
                  }}
                  className="journal-textarea"
                  disabled={!(date == (new Date().toISOString().split("T")[0]).toString())}
                />
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{ width: "100%", backgroundColor: !(date == (new Date().toISOString().split("T")[0]).toString()) ? "#e9ecef" : "" }}
                >
                  <Center>
                    <Rating size="lg" defaultValue={0} />
                  </Center>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </MantineProvider>
  );
}

export default App;
