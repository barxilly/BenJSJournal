import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import {
  Button,
  Card,
  Center,
  createTheme,
  Flex,
  Grid,
  Indicator,
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
import { FaCog } from "react-icons/fa";
import { BiCross, BiMicrophone } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useEffect } from "react";
import { BsRecordCircle, BsSpeaker } from "react-icons/bs";
import { IoRecording } from "react-icons/io5";
import { IoIosRecording } from "react-icons/io";

function App() {
  const [date, setDate] = useState<string | null>(
    new Date().toISOString().split("T")[0].toString()
  );
  const [curTitle, setCurTitle] = useState<string | null>(null);
  const [curContent, setCurContent] = useState<string | null>(null);
  const [curRating, setCurRating] = useState<number | null>(null);
  const [recording, setRecording] = useState<boolean>(false);

  // Move initialization logic to useEffect to avoid state updates during render

  useEffect(() => {
    // Initialize localStorage with an empty object if it doesn't exist
    if (!localStorage.getItem("journalEntries")) {
      localStorage.setItem("journalEntries", JSON.stringify({}));
      console.log(
        "Initialized localStorage with an empty journalEntries object."
      );
    } else {
      const entries = JSON.parse(
        localStorage.getItem("journalEntries") || "{}"
      );
      console.log("Loaded journal entries from localStorage:", entries);
      // Set the current date's title if it exists
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setCurTitle(entries[today]?.title || "");
      setCurContent(entries[today]?.content || "");
      setCurRating(entries[today]?.rating || 0);
    }
  }, []);

  function editJournal(
    date: string,
    title?: string,
    content?: string,
    rating?: number
  ) {
    let entries = JSON.parse(localStorage.getItem("journalEntries") || "{}");
    if (!entries[date]) {
      entries[date] = {
        title: title || "",
        content: content || "",
        rating: rating || 0,
      };
      console.log(
        "New entry created for date:",
        date,
        "with title:",
        entries[date].title
      );
    } else {
      entries[date].title = title || entries[date].title;
      entries[date].content = content || entries[date].content;
      entries[date].rating = rating || entries[date].rating;
      console.log(
        "Entry updated for date:",
        date,
        "with title:",
        entries[date].title
      );
    }
    localStorage.setItem("journalEntries", JSON.stringify(entries));
    console.log("Journal entries saved to localStorage:", entries);
  }

  const theme = createTheme({
    fontFamily: '"Rubik", sans-serif',
    headings: { fontFamily: '"M PLUS Rounded 1c", sans-serif' },
  });

  function isMobile() {
    // Use user agent or screen width to determine if the device is mobile
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      (window.innerWidth <= 800 && window.innerHeight <= 600)
    );
  }

  function browserSupportsSpeechRecognition() {
    // Only Chrome, Edge, and Safari support speech recognition
    // Check if browser is exactly Chrome, Edge, or Safari
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }

  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <BsRecordCircle
        style={{
          position: "fixed",
          top: "1em",
          right: "1em",
          fontSize: "2em",
          color: "red",
          cursor: "pointer",
          display: recording ? "block" : "none",
          animation: recording ? "pulse 1s infinite" : "none",
        }}
      />
      <Center
        className="appcon"
        style={{
          width: "100vw",
          paddingTop: "2em",
          paddingBottom: "2em",
          paddingLeft: "1em",
          paddingRight: "1em",
          position: "relative",
        }}
      >
        <Stack
          align="center"
          justify="center"
          style={{ width: "100%", maxWidth: 800 }}
          id="main-content"
        >
          <div style={{ textAlign: "center" }}>
            <Title className="title" style={{ fontWeight: "900" }}>
              BenJS Journal
            </Title>
            <Title order={4}>
              I'm aware how big-headed naming apps after myself is
            </Title>
          </div>
          <Space h="lg" />
          <Grid
            justify="center"
            align="stretch"
            style={{ width: "100%", minHeight: "60vh", position: "relative" }}
          >
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Card
                padding="lg"
                radius="lg"
                withBorder
                style={{ width: "100%", height: "60vh" }}
                color="white"
              >
                <DatePicker
                  size={!isMobile() ? "lg" : "xl"}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  firstDayOfWeek={1}
                  hideOutsideDates
                  defaultValue={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(value) => {
                    if (value) {
                      const selectedDate = value;
                      setDate(selectedDate);
                      const entries = JSON.parse(
                        localStorage.getItem("journalEntries") || "{}"
                      );
                      if (!entries[selectedDate]) {
                        editJournal(selectedDate);
                      } else {
                        console.log(
                          "Entry already exists for date:",
                          selectedDate
                        );
                      }
                      setCurTitle(entries[selectedDate]?.title || "");
                      setCurContent(entries[selectedDate]?.content || "");
                      setCurRating(entries[selectedDate]?.rating || 0);
                    }
                  }}
                  renderDay={(rdate: string) => {
                    const today = new Date().toISOString().split("T")[0];
                    const isToday = rdate === today;
                    const isWeekend =
                      new Date(rdate).getDay() === 0 ||
                      new Date(rdate).getDay() === 6;
                    const isPast = new Date(rdate) < new Date(today);
                    const isSelected = rdate === date;
                    return (
                      <div
                        style={{
                          padding: "0.5em",
                          position: "relative",
                          borderRadius: "var(--mantine-radius-default)",
                          color: isSelected
                            ? ""
                            : isToday
                            ? "var(--mantine-primary-color-filled)"
                            : isWeekend
                            ? isPast
                              ? "#ff9d9d"
                              : "#ee6b6b"
                            : isPast
                            ? "#adb5bd"
                            : "#495057",
                          border: isSelected
                            ? ""
                            : isToday
                            ? "2px solid var(--mantine-primary-color-filled)"
                            : "",
                        }}
                      >
                        {JSON.parse(
                          localStorage.getItem("journalEntries") || "{}"
                        )[rdate]?.rating > 0 ? (
                          <>
                            <Indicator
                              color="green"
                              size={8}
                              offset={-2}
                              style={{
                                position: "absolute",
                                top: "0.5em",
                                right: "0.5em",
                              }}
                            ></Indicator>
                            {rdate.split("-")[2]}
                          </>
                        ) : (
                          rdate.split("-")[2]
                        )}
                      </div>
                    );
                  }}
                />
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
                  disabled={
                    !(date == new Date().toISOString().split("T")[0].toString())
                  }
                  onChange={(e) => {
                    editJournal(date || "", e.target.value);
                    setCurTitle(e.target.value);
                  }}
                  value={curTitle || ""}
                />
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    height: "100%",
                  }}
                >
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
                    maxRows={8}
                    variant="default"
                    size="md"
                    radius="lg"
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      lineHeight: 1.6,
                    }}
                    className="journal-textarea"
                    disabled={
                      !(
                        date ==
                        new Date().toISOString().split("T")[0].toString()
                      )
                    }
                    value={curContent || ""}
                    onChange={(e) => {
                      editJournal(date || "", undefined, e.target.value);
                      setCurContent(e.target.value);
                    }}
                  />
                  <BiMicrophone
                    color="grey"
                    style={{
                      position: "absolute",
                      bottom: "1em",
                      right: "1em",
                      cursor: "pointer",
                      zIndex: "1000",
                      display: browserSupportsSpeechRecognition() ? "" : "none",
                    }}
                    onClick={() => {
                      // Transcribe audio input to text using Web Speech API
                      if (
                        !("webkitSpeechRecognition" in window) &&
                        !("SpeechRecognition" in window)
                      ) {
                        alert(
                          "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
                        );
                        return;
                      }

                      if (recording) {
                        // Stop recording if already recording
                        const recognition = (window as any).SpeechRecognition
                          ? (window as any).SpeechRecognition.getInstance()
                          : (
                              window as any
                            ).webkitSpeechRecognition.getInstance();
                        if (recognition) {
                          try {
                            recognition.stop();
                            setRecording(false);
                          } catch (e) {
                            console.log(
                              "Error stopping speech recognition:",
                              e
                            );
                          }
                        }
                        return;
                      }

                      const SpeechRecognition =
                        (window as any).SpeechRecognition ||
                        (window as any).webkitSpeechRecognition;
                      const recognition = new SpeechRecognition();

                      // More robust configuration
                      recognition.continuous = true; // Enable continuous recording for natural journaling
                      recognition.interimResults = true;
                      recognition.lang = "en-US";
                      recognition.maxAlternatives = 1;

                      let finalTranscript = "";
                      let isRecognitionActive = false;

                      recognition.onstart = () => {
                        console.log("Speech recognition started");
                        isRecognitionActive = true;
                        setRecording(true);
                      };

                      recognition.onresult = (event: any) => {
                        let interimTranscript = "";

                        for (
                          let i = event.resultIndex;
                          i < event.results.length;
                          i++
                        ) {
                          const transcript = event.results[i][0].transcript;
                          if (event.results[i].isFinal) {
                            finalTranscript += transcript + " ";
                          } else {
                            interimTranscript += transcript;
                          }
                        }

                        // Update the textarea with the transcribed text
                        const currentContent = curContent || "";
                        const newContent =
                          currentContent + finalTranscript + interimTranscript;
                        setCurContent(newContent);
                        editJournal(date || "", undefined, newContent);
                      };

                      recognition.onerror = (event: any) => {
                        console.log(
                          "Speech recognition error (handled silently):",
                          event.error
                        );
                        // Don't show alerts for common errors, just handle gracefully
                        if (
                          event.error === "network" ||
                          event.error === "no-speech" ||
                          event.error === "aborted"
                        ) {
                          alert(
                            "Only Chrome, Edge, and Safari support speech recognition. Blame Google."
                          );
                          //return;
                          // Fallback for unsupported browsers, using library
                        }
                        // Only alert for unexpected errors
                        if (event.error === "not-allowed") {
                          alert(
                            "Microphone access denied. Please allow microphone access in your browser settings."
                          );
                        }
                      };

                      recognition.onend = () => {
                        console.log("Speech recognition ended");
                        setRecording(false);
                        isRecognitionActive = false;
                        if (finalTranscript) {
                          const currentContent = curContent || "";
                          const newContent = currentContent + finalTranscript;
                          setCurContent(newContent);
                          editJournal(date || "", undefined, newContent);
                        }
                      };

                      // Start recognition with retry mechanism
                      try {
                        recognition.start();

                        // Auto-stop after 8 seconds to prevent hanging
                        setTimeout(() => {
                          if (isRecognitionActive) {
                            try {
                              recognition.stop();
                            } catch (e) {
                              // Ignore errors when stopping
                            }
                          }
                        }, 8000);
                      } catch (error) {
                        console.log(
                          "Error starting speech recognition:",
                          error
                        );
                        // Silent fallback - don't alert the user
                      }
                    }}
                  />
                </div>
                <Card
                  padding="lg"
                  radius="lg"
                  withBorder
                  color="white"
                  className="rating-card"
                  style={{
                    width: "100%",
                    backgroundColor: !(
                      date == new Date().toISOString().split("T")[0].toString()
                    )
                      ? "var(--mantine-color-disabled)"
                      : "",
                  }}
                >
                  <Center>
                    <Rating
                      size="lg"
                      defaultValue={0}
                      style={{
                        pointerEvents: !(
                          date ==
                          new Date().toISOString().split("T")[0].toString()
                        )
                          ? "none"
                          : "auto",
                      }}
                      onChange={(value) => {
                        if (
                          !(
                            date ==
                            new Date().toISOString().split("T")[0].toString()
                          )
                        )
                          return;
                        editJournal(date || "", undefined, undefined, value);
                        setCurRating(value);
                      }}
                      color={
                        !(
                          date ==
                          new Date().toISOString().split("T")[0].toString()
                        )
                          ? "#aaa"
                          : "var(--mantine-color-yellow-filled)"
                      }
                      value={curRating || 0}
                    />
                  </Center>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
        <Card
          id="settings-card"
          style={{
            display: "none",
            position: "fixed",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "90vw",
            zIndex: 1000,
            minHeight: "70vh",
            maxHeight: "90vh",
          }}
          padding="lg"
          radius="lg"
          withBorder
        >
          <ImCross
            className="close-icon"
            onClick={() => {
              const settingsCard = document.getElementById("settings-card");
              if (settingsCard) {
                settingsCard.style.display = "none";
                const mainContent = document.getElementById("main-content");
                if (mainContent) {
                  mainContent.style.opacity = "1";
                  mainContent.style.userSelect = "auto";
                  mainContent.style.pointerEvents = "auto";
                }
                // Make settings cog icon reappear when settings are closed
                const settingsIcon = document.querySelector(".settings-icon");
                if (settingsIcon) {
                  settingsIcon.classList.remove("hidden");
                }
              }
            }}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "1em",
              right: "1em",
              fontSize: "24px",
            }}
          />
          <Title order={3}>Settings</Title>
          <Title order={4} style={{ marginTop: "1em", marginBottom: "0.5em" }}>
            Export
          </Title>
          <Flex gap="md">
            <Button
              onClick={() => {
                let entries = JSON.parse(
                  localStorage.getItem("journalEntries") || "{}"
                );
                // Remove blank entries
                entries = Object.fromEntries(
                  Object.entries(entries as any).filter(
                    ([, value]: [string, any]) => {
                      return value.title || value.content || value.rating;
                    }
                  )
                );
                const blob = new Blob([JSON.stringify(entries, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "journal-entries.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              .JSON
            </Button>
            <Button
              onClick={async () => {
                let entries = JSON.parse(
                  localStorage.getItem("journalEntries") || "{}"
                );
                // Remove blank entries
                entries = Object.fromEntries(
                  Object.entries(entries as any).filter(
                    ([, value]: [string, any]) => {
                      return value.title || value.content || value.rating;
                    }
                  )
                );

                // Ask user for password
                const password = prompt(
                  "Enter a password to encrypt your journal entries:"
                );
                if (password) {
                  try {
                    const encoder = new TextEncoder();

                    // Derive key from password using PBKDF2
                    const salt = crypto.getRandomValues(new Uint8Array(16));
                    const keyMaterial = await crypto.subtle.importKey(
                      "raw",
                      encoder.encode(password),
                      "PBKDF2",
                      false,
                      ["deriveKey"]
                    );

                    const key = await crypto.subtle.deriveKey(
                      {
                        name: "PBKDF2",
                        salt: salt,
                        iterations: 100000,
                        hash: "SHA-256",
                      },
                      keyMaterial,
                      { name: "AES-GCM", length: 256 },
                      false,
                      ["encrypt"]
                    );

                    // Encrypt the data
                    const iv = crypto.getRandomValues(new Uint8Array(12));
                    const dataToEncrypt = encoder.encode(
                      JSON.stringify(entries)
                    );

                    const encryptedData = await crypto.subtle.encrypt(
                      {
                        name: "AES-GCM",
                        iv: iv,
                      },
                      key,
                      dataToEncrypt
                    );

                    // Package everything together
                    const encryptedPackage = {
                      salt: Array.from(salt),
                      iv: Array.from(iv),
                      data: Array.from(new Uint8Array(encryptedData)),
                    };

                    const blob = new Blob([JSON.stringify(encryptedPackage)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "journal-entries.jbjs";
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Encryption failed:", error);
                    alert("Failed to encrypt journal entries.");
                  }
                } else {
                  alert("Password is required to encrypt journal entries.");
                }
              }}
            >
              .JBJS (Encrypted Journal Format)
            </Button>
          </Flex>
          <Title order={4} style={{ marginTop: "1em" }}>
            Import (.JBJS)
          </Title>
          <Flex gap="md">
            <Card withBorder m="1em">
              <input
                type="file"
                accept=".jbjs"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  // Ask for password if file is .jbjs
                  if (file && file.name.endsWith(".jbjs")) {
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                      const content = event.target?.result as string;
                      try {
                        const encryptedPackage = JSON.parse(content);
                        const password = prompt(
                          "Enter the password to decrypt your journal entries:"
                        );
                        if (password) {
                          try {
                            const encoder = new TextEncoder();
                            const decoder = new TextDecoder();

                            // Recreate the salt and IV from arrays
                            const salt = new Uint8Array(encryptedPackage.salt);
                            const iv = new Uint8Array(encryptedPackage.iv);
                            const encryptedData = new Uint8Array(
                              encryptedPackage.data
                            );

                            // Derive the same key from password
                            const keyMaterial = await crypto.subtle.importKey(
                              "raw",
                              encoder.encode(password),
                              "PBKDF2",
                              false,
                              ["deriveKey"]
                            );

                            const key = await crypto.subtle.deriveKey(
                              {
                                name: "PBKDF2",
                                salt: salt,
                                iterations: 100000,
                                hash: "SHA-256",
                              },
                              keyMaterial,
                              { name: "AES-GCM", length: 256 },
                              false,
                              ["decrypt"]
                            );

                            // Decrypt the data
                            const decryptedData = await crypto.subtle.decrypt(
                              {
                                name: "AES-GCM",
                                iv: iv,
                              },
                              key,
                              encryptedData
                            );

                            const decryptedText = decoder.decode(decryptedData);
                            const entries = JSON.parse(decryptedText);

                            localStorage.setItem(
                              "journalEntries",
                              JSON.stringify(entries)
                            );
                            alert("Journal entries imported successfully.");
                            window.location.reload();
                          } catch (error) {
                            e.target.value = "";
                            console.error("Decryption failed:", error);
                            alert(
                              "Incorrect password or corrupted file. Journal entries not imported."
                            );
                          }
                        } else {
                          e.target.value = "";
                          alert(
                            "Password is required to decrypt journal entries."
                          );
                        }
                      } catch (error) {
                        e.target.value = "";
                        console.error("Error parsing JBJS file:", error);
                        alert("Invalid JBJS file format.");
                      }
                    };
                    reader.readAsText(file);
                  } else if (file && file.name.endsWith(".json")) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      try {
                        const entries = JSON.parse(content);
                        localStorage.setItem(
                          "journalEntries",
                          JSON.stringify(entries)
                        );
                        alert("Journal entries imported successfully.");
                        window.location.reload();
                      } catch (error) {
                        console.error("Error parsing JSON file:", error);
                        alert("Invalid JSON file format.");
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
                id="import-json"
              />
            </Card>
          </Flex>
          <Title order={4} style={{ marginTop: "0em", marginBottom: "0.5em" }}>
            Delete All Entries
          </Title>
          <Button
            color="red"
            variant="outline"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete all journal entries? This action cannot be undone."
                )
              ) {
                localStorage.removeItem("journalEntries");
                alert("All journal entries deleted.");
                window.location.reload();
              }
            }}
          >
            <ImCross />
            &nbsp;&nbsp;Delete All Entries
          </Button>
        </Card>
      </Center>

      <FaCog
        className="settings-icon"
        onClick={() => {
          const settingsCard = document.getElementById("settings-card");
          if (settingsCard) {
            settingsCard.style.display =
              settingsCard.style.display === "none" ? "block" : "none";
            const mainContent = document.getElementById("main-content");
            mainContent!.style.opacity =
              mainContent!.style.opacity === "0.5" ? "1" : "0.5";
            // Make main content do nothing when settings are open
            mainContent!.style.userSelect =
              mainContent!.style.userSelect === "none" ? "auto" : "none";
            mainContent!.style.pointerEvents =
              mainContent!.style.pointerEvents === "none" ? "auto" : "none";

            // Make settings cog icon disappear when settings are open
            const settingsIcon = document.querySelector(".settings-icon");
            if (settingsIcon) {
              settingsIcon.classList.toggle("hidden");
            }
          }
        }}
      />
    </MantineProvider>
  );
}

export default App;
