import { Collection, CollectionTip, Layout } from '@/components';
import { COLLECTIONS_TIP } from '@/const';
import { Flex } from '@chakra-ui/react';
import { useBlock } from '@dopt/react';

export function Collections() {
  const [{ state }, { complete }] = useBlock(COLLECTIONS_TIP);

  const productDemoCollection = (
    <Collection
      thumbnailSrc={`${import.meta.env.BASE_URL}thumb-2.jpg`}
      title="#productdemo"
      videoCount={39}
    />
  );

  const allHandsCollection = (
    <Collection
      thumbnailSrc={`${import.meta.env.BASE_URL}thumb-3.jpg`}
      title="#allhands"
      videoCount={39}
    />
  );

  return (
    <Layout title="Collections">
      <Flex gap={4} flexWrap="wrap">
        {state.active && (
          <CollectionTip
            thumbnailSrc={`${import.meta.env.BASE_URL}tip-thumb-2.png`}
            title="Collections"
            description="Collections are groups of related videos based on #tags."
            onComplete={complete}
          />
        )}
        {[...Array(7)].map((e, i) => {
          if (i % 2) {
            return allHandsCollection;
          }
          return productDemoCollection;
        })}
      </Flex>
    </Layout>
  );
}