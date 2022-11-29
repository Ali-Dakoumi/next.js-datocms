const query = `
      query allPosts($limit: IntType) {
        posts: allPosts(first: $limit, orderBy:_firstPublishedAt_DESC) {
         seo: _seoMetaTags {
            attributes
            content
            tag
          }
          title
          _firstPublishedAt
          photos {
            responsiveImage(imgixParams: {auto: [format]}) {
              ...imageFields
            }
          }
          author {
            name
            avatar {
              responsiveImage(imgixParams: {auto: [format], w: 60,}) {
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
    `

const allSlugs = `
query allSlugs {
 slugs :allPosts {
    title
  }
}
`

const tweetsQuery = `
query myTweets($limit: IntType)
  {
     tweets : allTweets(first: $limit, orderBy:_firstPublishedAt_DESC) {
      id
      content
      _firstPublishedAt
      author {
        name
      }
    }
}
`

const tagsQuery = `
query myQuery{
    allTags {
      tagname
      id
    }
}
`

const searchByAuthor = `
query searchByAuthor($id: ItemId) {
  posts:  allPosts(filter: {author: {eq: $id}}) {
      title
      id
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
`

const searchByTag = `
query searchByTag($id: [ItemId]) {
    posts:  allPosts(filter: {tags: {allIn: $id}}) {
        title
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
`

const singlePost = `
query post($title: String) {
  post: post(filter: {title: {eq: $title}}) {
    seo: _seoMetaTags {
      attributes
      content
      tag
    }
    title
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
`

const allAuthors = `
query allAuthors {
  allAuthors {
    name
    id

      avatar {
        responsiveImage(imgixParams: {auto: [format], w: 60,}) {
          ...imageFields
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
`

const cardQuery = `
query cardQuery {
  card {
    image {
      responsiveImage(imgixParams: {auto: [format]}) {
              ...imageFields
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
`

const authorById = `
query MyQuery($id: ItemId) {
  author(filter: {id: {eq: $id}}) {
    name
  }
}
`
const tagById = `
query MyQuery($id: ItemId) {
  tag(filter: {id: {eq: $id}}) {
    tagname
  }
}
`
export {
  query,
  tweetsQuery,
  tagsQuery,
  searchByTag,
  singlePost,
  allAuthors,
  searchByAuthor,
  allSlugs,
  cardQuery,
  authorById,
  tagById,
}
