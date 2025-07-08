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
  const [curTitle, setCurTitle] = useState<string | null>(null);
  const [curContent, setCurContent] = useState<string | null>(null);
  const [curRating, setCurRating] = useState<number | null>(null);

  window.onload = () => {
    // Initialize localStorage with an empty object if it doesn't exist
    if (!localStorage.getItem("journalEntries")) {
      localStorage.setItem("journalEntries", JSON.stringify({}));
      console.log("Initialized localStorage with an empty journalEntries object.");
    } else {
      const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
      console.log("Loaded journal entries from localStorage:", entries);
      // Set the current date's title if it exists
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setCurTitle(entries[today]?.title || "");
      setCurContent(entries[today]?.content || "");
      setCurRating(entries[today]?.rating || 0);
    }
  }

   function editJournal(date:string, title?:string, content?:string, rating?:number) {
    let entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
    if (!entries[date]) {
      entries[date] = {
        title: title || "",
        content: content || "",
        rating: rating || 0,
      };
      console.log("New entry created for date:", date, "with title:", entries[date].title);
    }
    else {
      entries[date].title = title || entries[date].title;
      entries[date].content = content || entries[date].content;
      entries[date].rating = rating || entries[date].rating;
      console.log("Entry updated for date:", date, "with title:", entries[date].title);
    }
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    console.log("Journal entries saved to localStorage:", entries);
  }

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
                color="white"
              >
                <Center>
                  <DatePicker 
                    size="lg"
                    
                    style={{ width: "100%", height: "100%" }}
                    firstDayOfWeek={1}
                    hideOutsideDates
                    defaultValue={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(value) => {
                      if (value) {
                        const selectedDate = value;
                        setDate(selectedDate);
                        const entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
                        if (!entries[selectedDate]) {
                          editJournal(selectedDate);
                        } else {
                          console.log("Entry already exists for date:", selectedDate);
                        }
                        setCurTitle(entries[selectedDate]?.title || "");
                        setCurContent(entries[selectedDate]?.content || "");
                        setCurRating(entries[selectedDate]?.rating || 0);
                      }
                    }}
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
                  onChange={(e) => {
                    editJournal(date || "", e.target.value);
                    setCurTitle(e.target.value);
                  }}
                  value={curTitle || ""}

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
                  value={curContent || ""}
                  onChange={(e) => {
                    editJournal(date || "", undefined, e.target.value);
                    setCurContent(e.target.value);
                  }}
                />
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  color="white"
                  className="rating-card"
                  style={{ width: "100%", backgroundColor: !(date == (new Date().toISOString().split("T")[0]).toString()) ? "#e9ecef" : "" }}
                >
                  <Center>
                    <Rating size="lg" defaultValue={0} onChange={(value) => {
                      editJournal(date || "", undefined, undefined, value);
                      setCurRating(value);
                    }} 
                    value={curRating || 0} />
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
