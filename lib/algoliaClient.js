import algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(
  // process.env.ALGOLIA_APP_ID,
  // process.env.ALGOLIA_ADMIN_KEY
  "LYNDX84BEQ",
  "b57cea768c520ae138c65eb2c3bd1c7a"
);

export default algoliaClient;
