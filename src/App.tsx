import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import { Center, Grid, MantineProvider, Space, Stack, Textarea, Title, useMantineColorScheme } from "@mantine/core";
import { Calendar } from "@mantine/dates";

function App() {
  
  return (
    <MantineProvider defaultColorScheme="auto" >
      <Center className="appcon" style={{ height: "100vh", width: "100vw" }}>
        <Stack align="center" justify="center" style={{ width: "100%", maxWidth: 800 }}>
          <div style={{ textAlign: "center" }}>
            <Title className="title">BenJS Journal</Title>
            <Title order={4}>
              I'm aware how big-headed naming apps after myself is
            </Title>
          </div>
          <Space h="lg" />
          <Grid justify="center" align="center" style={{ width: "100%" }}>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Calendar></Calendar>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Textarea
                placeholder={[
                  "Write your thoughts here...",
                  "What happened today?",
                  "How do you feel?",
                  "What are you grateful for?",
                  "What did you learn today?",
                  "What challenges did you face?",
                  "What made you happy today?",
                  "What are your goals for tomorrow?",
                  "Reflect on your day.",
                  "Describe a memorable moment."
                ][Math.floor(Math.random() * 10)]}
                autosize
                minRows={10}
                maxRows={20}
                variant="filled"
                size="md"
                radius="lg"
                style={{ 
                  width: "100%",
                  fontSize: "16px",
                  lineHeight: 1.6
                }}
                className="journal-textarea"
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Center>
    </MantineProvider>
  );
}

export default App;
