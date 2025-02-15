import {
  Link,
  Box,
  Text,
  SimpleGrid,
  Heading,
  AspectRatio,
} from "@chakra-ui/react";
import { NFT } from "opensea-js";
import useNFT from "../hooks/useNFT";
interface Props {
  ethAddress: string;
}
const NFTCard = ({ ethAddress }: Props) => {
  const { nfts, gotoNext } = useNFT(ethAddress);
  return (
    <>
      {nfts && (
        <Heading mt={4} mb={4} color="brand-dark" fontSize="20px">
          NFTs:
        </Heading>
      )}
      <SimpleGrid mb={4} columns={5} spacing={1}>
        {nfts &&
          nfts.map((data: NFT) => (
            <Link key={data.identifier} isExternal p={1}>
              <AspectRatio
                maxW="100%"
                ratio={1}
                backgroundImage={data.image_url}
                backgroundPosition="center"
                backgroundSize="cover"
                overflow="hidden"
                borderRadius="100%"
              >
                <Box></Box>
              </AspectRatio>
              <Text fontSize="xs" mt="10px">
                {data.name}
              </Text>
            </Link>
          ))}
      </SimpleGrid>
      <Link onClick={gotoNext}>Next</Link>
    </>
  );
};

export default NFTCard;
