const query = `
      query HomePage($limit: IntType) {
        posts: allPosts(first: $limit, orderBy:_firstPublishedAt_DESC) {
          title
          id
          tags {
            tagname
          }
          _firstPublishedAt
          photos {
            responsiveImage(imgixParams: {auto: [format]}) {
              ...imageFields
            }
          }
          author {
            name
            avatar {
              responsiveImage(imgixParams: {auto: [format], w: 60}) {
                ...imageFields
              }
            }
          }
        }
      }

      fragment imageFields on ResponsiveImage {
        aspectRatio
        base64
        height
        sizes
        src
        srcSet
        width
        alt
        title
      }
    `;

const tweetsQuery = `
query myTweets($limit: IntType)
  {
     tweets : allTweets(first: $limit, orderBy:_firstPublishedAt_DESC) {
      id
      content
      author {
        name
        avatar {
          responsiveImage(imgixParams: {auto: [format], w: 60}) {
            ...imageFields
          }
        }
      }
      _firstPublishedAt
    }
}
fragment imageFields on ResponsiveImage {
    aspectRatio
    base64
    height
    sizes
    src
    srcSet
    width
    alt
    title
  }
  
`;

const tagsQuery = `
query allTags{
    allTags {
      tagname
      id
    }
}
`;

const searchByTag = `
query searchByTag($id: [ItemId]) {
    posts:  allPosts(filter: {tags: {allIn: $id}}) {
        title
        id
        content
        tags {
          tagname
        }
        _firstPublishedAt
        photos {
          responsiveImage(imgixParams: {auto: [format]}) {
            ...imageFields
          }
        }
        author {
          name
          avatar {
            responsiveImage(imgixParams: {auto: [format], w: 60}) {
              ...imageFields
            }
          }
        }
      }
    }

    fragment imageFields on ResponsiveImage {
      aspectRatio
      base64
      height
      sizes
      src
      srcSet
      width
      alt
      title
    }
`;

const singlePost = `
query post($title: [String]) {
  post: post(orderBy: _firstPublishedAt_DESC, filter: {title: {in: $title}}) {
    title
    id
    tags {
      tagname
    }
    _firstPublishedAt
    photos {
      responsiveImage(imgixParams: {auto: [format]}) {
        ...imageFields
      }
    }
    author {
      name
      avatar {
        responsiveImage(imgixParams: {auto: [format], w: 60}) {
          ...imageFields
        }
      }
    }
  }
}

fragment imageFields on ResponsiveImage {
  aspectRatio
  base64
  height
  sizes
  src
  srcSet
  width
  alt
  title
}
`;
export { query, tweetsQuery, tagsQuery, searchByTag, singlePost };
