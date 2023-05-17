import { Box, Flex, Image, Text } from "@chakra-ui/react"
import logo from '../assets/openai.png'

const Footer = () => {
  return (
    <>
    <Box marginTop='20px'>
        <Flex justifyContent='center' alignItems='center'>
            <Image src={logo} marginRight={1} alt="logo"/>
            <Text>Powered by Open AI</Text>
        </Flex>
    </Box>
    </>
  )
}
export default Footer