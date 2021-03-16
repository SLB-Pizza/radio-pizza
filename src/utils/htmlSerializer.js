import React from 'react'
import { Elements } from 'prismic-richtext'
import { linkResolver } from './index'
import { Link as PrismicLink } from 'prismic-reactjs'
import Embed from 'react-embed'
import { Tweet } from 'react-twitter-widgets'
import { Link } from 'gatsby'
import { HMBKIFrame } from '../components'

// -- Function to add unique key to props
const propsWithUniqueKey = function(props, key) {
  // console.log(key);
  return Object.assign(props || {}, { key })
}

/**
 * Customize the HTML output of a Rich Text Field by incorporating an HTML Serializer into your project. This allows you to do things like adding custom classes to certain elements or modifying the way an element will be displayed. Called by `<RichText />` components and by CMS Slices like
 * @category Utilities
 * @function htmlSerializer
 * @see {@link https://prismic.io/docs/gatsby/misc-topics/html-serializer HTML Serializer with Gatsby}
 * @returns {jsx} The customized JSX
 */
const htmlSerializer = function(type, element, content, children, key) {
  var props = {}

  switch (type) {
    case Elements.heading1: // Heading 1
      props = { className: 'title' }
      return React.createElement('h1', propsWithUniqueKey(props, key), children)

    case Elements.heading2: // Heading 2
      props = { className: 'title' }
      return React.createElement('h2', propsWithUniqueKey(props, key), children)

    case Elements.heading3: // Heading 3
      props = { className: 'title' }
      return React.createElement('h3', propsWithUniqueKey(props, key), children)

    case Elements.heading4: // Heading 4
      props = { className: 'title' }
      return React.createElement('h4', propsWithUniqueKey(props, key), children)

    case Elements.heading5: // Heading 5
      props = { className: 'title' }
      return React.createElement('h5', propsWithUniqueKey(props, key), children)

    case Elements.heading6: // Heading 6
      props = { className: 'title' }
      return React.createElement('h6', propsWithUniqueKey(props, key), children)

    // case Elements.paragraph: // Paragraph
    //   return React.createElement("p", propsWithUniqueKey(props, key), children);

    // case Elements.preformatted: // Preformatted
    //   return React.createElement(
    //     "pre",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.strong: // Strong
    //   return React.createElement(
    //     "strong",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.em: // Emphasis
    //   return React.createElement(
    //     "em",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.listItem: // Unordered List Item
    //   return React.createElement(
    //     "li",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.oListItem: // Ordered List Item
    //   return React.createElement(
    //     "li",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.list: // Unordered List
    //   return React.createElement(
    //     "ul",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    // case Elements.oList: // Ordered List
    //   return React.createElement(
    //     "ol",
    //     propsWithUniqueKey(props, key),
    //     children
    //   );

    /**
     * For inline images, pull the image right and wrap it according to bulma CSS conventions. Make sure the whole thing is wrapped in a React fragment so we don't add `<div>` to
     *
     * Result:
     * ```jsx
     * <>
     *  <figure className="is-pulled-right is-clearfix">
     *    <img className="has-ratio" />
     *    <figcaption>{available img details}</figcaption>
     *  </figure>
     *  <div className="is-clearfix" />
     * <>
     * ```
     */
    case Elements.image: // Image
      const linkUrl = element.linkTo
        ? element.linkTo.url || linkResolver(element.linkTo)
        : null
      const linkTarget =
        element.linkTo && element.linkTo.target
          ? { target: element.linkTo.target }
          : {}
      const linkRel = linkTarget.target ? { rel: 'noopener' } : {}
      const img = React.createElement('img', {
        src: element.url,
        alt: element.alt || '',
        width: '300',
        className: 'has-ratio',
      })

      const imgDetails = element.copyright ? (
        <figcaption className="credit">
          {`${element.alt} - ${element.copyright}`}
        </figcaption>
      ) : (
        <figcaption className="credit">{element.alt}</figcaption>
      )

      const wrappedImg = React.createElement(
        'figure',
        propsWithUniqueKey({ className: 'is-pulled-right is-clearfix' }, key),
        linkUrl
          ? React.createElement(
              'a',
              Object.assign({ href: linkUrl }, linkTarget, linkRel),
              img,
              imgDetails
            )
          : img,
        imgDetails
      )
      return <React.Fragment key={key}>{wrappedImg}</React.Fragment>

    // DEFAULT EMBED
    case Elements.embed: // Embed
      const { label, oembed } = element

      /**
       * Create props for embeds that use that will use their own html
       */
      props = Object.assign(
        {
          'data-oembed': oembed.embed_url,
          'data-oembed-type': oembed.type,
          'data-oembed-provider': oembed.provider_name,
          dangerouslySetInnerHTML: {
            __html: oembed.html,
          },
        },
        label ? { className: label } : {}
      )

      /**
       * Customize the `iframe` to fit based on `oembed.provider_name`.
       *
       *=========================================
       * NB: 'Bandcamp' is not a `provider_name`
       * It's `song` or `album`.
       *=========================================
       */
      switch (oembed.provider_name) {
        case 'YouTube':
          // case 'Facebook':
          // /**
          //  * Use for RichText embeds.
          //  */
          // if (oembed.provider_name === 'Facebook' && oembed.type !== 'video') {
          //   return React.createElement(
          //     'figure',
          //     propsWithUniqueKey(props, key),
          //     null
          //   )
          // } else {
          //   /**
          //    * Use for:
          //    * - Facebook Videos
          //    * - YouTube videos
          //    */
          return (
            <HMBKIFrame oembedData={oembed} key={`text-block-segment-${key}`} />
          )
        // }
        case 'Twitter':
          const newTWInnerHTML = oembed.html.replace(
            '<a',
            '<a target="_blank" '
          )

          const newTWProps = Object.assign(
            {
              'data-oembed': oembed.embed_url,
              'data-oembed-type': oembed.type,
              'data-oembed-provider': oembed.provider_name,
              dangerouslySetInnerHTML: {
                __html: newTWInnerHTML,
              },
            },
            label ? { className: label } : {}
          )

          return React.createElement(
            'figure',
            propsWithUniqueKey(newTWProps, key),
            null
          )

        // Doesn't render because of a necessary script; CSP?
        // const splitOnSlashes = oembed.embed_url.split("/");
        // const tweetID = splitOnSlashes[splitOnSlashes.length - 1];

        // return (
        //   <Tweet
        //     tweetId={tweetID}
        //     options={{ theme: "dark", align: "center" }}
        //     key={`text-block-segment-${key}`}
        //   />
        // );

        // ALSO WORKS
        // return (
        //   <Embed
        //     isDark
        //     url={oembed.embed_url}
        //     key={`text-block-segment-${key}`}
        //   />
        // );
        case 'song':
        case 'album':
          /**
           * OnClick, the Bandcamp embed takes you away from the Halfmoon site
           * instead of opening it in a new tab. Fix this by:
           * 1. Splitting internal HTML string right after anchor tag start; `<a`
           * 2. Splicing in a `target="_blank"`.
           * 3. Putting it all back together.
           */
          const newBCInnerHTML = oembed.html.replace('<a', '<a target="blank" ')

          const newBCProps = Object.assign(
            {
              'data-oembed': oembed.embed_url,
              'data-oembed-type': oembed.type,
              'data-oembed-provider': oembed.provider_name,
              dangerouslySetInnerHTML: {
                __html: newBCInnerHTML,
              },
            },
            label ? { className: label } : {}
          )

          return React.createElement(
            'figure',
            propsWithUniqueKey(newBCProps, key),
            null
          )

        case 'Facebook':
          /**
           * Using `oembed.html` with changes to the included `<a>` tags.
           * `target="_blank"` needs to be spliced in.
           */
          const newFBInnerHTML = oembed.html.replace(
            '<a',
            '<a target="_blank" '
          )

          const newFBProps = Object.assign(
            {
              'data-oembed': oembed.embed_url,
              'data-oembed-type': oembed.type,
              'data-oembed-provider': oembed.provider_name,
              dangerouslySetInnerHTML: {
                __html: newFBInnerHTML,
              },
            },
            label ? { className: label } : {}
          )

          return React.createElement(
            'figure',
            propsWithUniqueKey(newFBProps, key),
            null
          )

        case 'Instagram':
          /**
           * The script at the end of the internal HTML doesn't properly include the `http:` before the `src` tag.
           *
           * End of oEmbed HTML script:
           * ```js
           * '<script async src="//platform.instagram.com/en_US/embeds.js"></script>'
           * ```
           *
           * We need to re-add this script with the `http`; then remake props.
           *
           * @see {@link https://stackoverflow.com/a/37447799/8239335 Why is instagram embed code only showing an instagram icon, not the image? ("View this post on instrgram")}
           */
          const newIGInnerHTML = oembed.html.replace(
            '//platform.',
            'http://platform.'
          )

          const newIGProps = Object.assign(
            {
              'data-oembed': oembed.embed_url,
              'data-oembed-type': oembed.type,
              'data-oembed-provider': oembed.provider_name,
              dangerouslySetInnerHTML: {
                __html: newIGInnerHTML,
              },
            },
            label ? { className: label } : {}
          )

          return React.createElement(
            'figure',
            propsWithUniqueKey(newIGProps, key),
            null
          )

        default:
          /**
           * All other providers use the unedited `oembed.html` set DANGEROUSLY.
           * - SoundCloud
           */

          return React.createElement(
            'figure',
            propsWithUniqueKey(props, key),
            null
          )
      }
    // ORIGINAL
    // props = Object.assign(
    //   {
    //     "data-oembed": element.oembed.embed_url,
    //     "data-oembed-type": element.oembed.type,
    //     "data-oembed-provider": element.oembed.provider_name,
    //     className: "has-ratio",
    //     dangerouslySetInnerHTML: { __html: element.oembed.html },
    //   },
    //   element.label ? { className: element.label } : {}
    // );
    //

    case Elements.hyperlink: // Hyperlinks
      let result = ''
      const url = PrismicLink.url(element.data, linkResolver)
      if (element.data.link_type === 'Document') {
        result = (
          <Link to={url} key={key}>
            {content}
          </Link>
        )
      } else {
        const targetAttr = element.data.target
          ? { target: element.data.target }
          : {}
        const relAttr = element.data.target ? { rel: 'noopener' } : {}
        props = Object.assign(
          {
            href: element.data.url || linkResolver(element.data),
          },
          targetAttr,
          relAttr
        )
        result = React.createElement(
          'a',
          propsWithUniqueKey(props, key),
          children
        )
      }
      return result

    case Elements.label: // Label
      props = element.data
        ? Object.assign({}, { className: element.data.label })
        : {}
      return React.createElement(
        'span',
        propsWithUniqueKey(props, key),
        children
      )

    case Elements.span: // Span
      if (content) {
        return content.split('\\n').reduce((acc, p) => {
          if (acc.length === 0) {
            return [p]
          } else {
            const brIndex = (acc.length + 1) / 2 - 1
            const br = React.createElement(
              'br',
              propsWithUniqueKey({}, brIndex)
            )
            return acc.concat([br, p])
          }
        }, [])
      } else {
        return null
      }

    // Always include a default that returns null
    default:
      return null
  }
}

export default htmlSerializer
