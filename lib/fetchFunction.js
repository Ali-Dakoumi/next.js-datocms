const fetchFunction = async (variable = "", query) => {
  let error = null;
  let data = null;
  data = fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: query,
      variables: variable,
    }),
  })
    .then((res) => res.json())
    .catch((err) => (error = err));
  return data;
};

const fetchQuery = async (query) => {
  const response = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: query,
    }),
  });
  return response.json();
};

export { fetchFunction, fetchQuery };
