import { Box, Container } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextInput from "./components/TextInput";
import { useState } from "react";
import KeywordsModal from "./components/KeywordsModal";

const App = () => {
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  
  const extractKeywords = async(text) => {
    setIsLoading(true);
    setIsOpen(true);

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt:
          "Extract keywords from this text. Make the first letter of each word uppercase and separate with comma\n\n" +
          text +
          "",
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8,
      }),

    };
    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options)

    const json = await response.json();

    const data = json.choices[0].text.trim()
    console.log(data);
    setKeywords(data)
    setIsLoading(false)
    
  };

  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <Box bg="blue.600" color="white" minHeight="100svh" paddingTop={100}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
        <Footer />
      </Container>
      <KeywordsModal keywords={keywords} isLoading={isLoading} isOpen={isOpen} closeModal={closeModal}/>
    </Box>
  );
};
export default App;
