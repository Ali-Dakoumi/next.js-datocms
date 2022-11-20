 let algoliaResults;
  let algoliaIndex;
  if (!algoliaIndex) {
    algoliaIndex = algoliaClient.initIndex("posts");
  }
  async function toAlgolia() {
    try {
      const algoliObjectIds = await algoliaIndex
        .replaceAllObjects(algoliaResults)
        .then((result) => console.log("success", result))
        .catch((err) => console.log(err));
      algoliaIndex.setSettings({ searchableAttributes: ["tags"] });
    } catch (error) {
      console.log(error);
    }
  }
  function algoliaMap(data) {
    console.log(posts);
    const algoliaResults = data.map((post) => {
      console.log();
      return {
        objectID: post.id,
        title: post.title,
        slug: slugify(post.title, {
          remove: /[$*_+~.()'"!\-:@]+/g,
        }),
        tags: post.tags,
        content: post.content,
        photos: post.photos,
        author: post.author,
        date: post._firstPublishedAt,
        photos: post.photos,
      };
    });
    return algoliaResults;
  }
  useEffect(() => {
    algoliaResults = algoliaMap(data.posts);
    setPosts(
      data.posts.map((post) => {
        return {
          ...post,
          slug: slugify(post.title, {
            remove: /[$*_+~.()'"!\-:@]+/g,
          }),
        };
      })
    );
    toAlgolia();
    console.log(algoliaResults);
    console.log("data changed");
  }, [data]);