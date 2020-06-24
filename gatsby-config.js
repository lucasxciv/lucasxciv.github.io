require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `Lucas de Oliveira`,
    position: `Software Developer`,
    description: `<p>Hi! My name is <b>Lucas de Oliveira</b>.</p><br />
      <p> I am a Software Developer. I've been working mainly as PHP Developer since 2013.</p><br />
      <p>
        I am currently working as Independent Software Developer and Consultant, living in
        Cruzeiro - São Paulo. I'm a <a href="http://www.zend.com/en/yellow-pages/ZEND027995" target="_blank">
        Zend Certified PHP Engineer</a>, graduated in Database at <a href="http://www.fateccruzeiro.edu.br/" target="_blank">
        Fatec Cruzeiro </a>, post graduated in Web and Mobile Development at
        <a href="http://unisal.br/unidades/lorena-sao-joaquim/" target="_blank">Unisal Lorena</a> and
        <a href="https://www.phpvale.com.br/" target="_blank">PHP User Group PHPVale</a> Co-founder.
      </p>`,
    author: `@oliveiralucasbr`,
    siteUrl: `https://deoliveiralucas.net`,
  },
  plugins: [
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // needs to be the first to work with gatsby-remark-images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `uploads`,
        path: `${__dirname}/static/assets/img`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-lazy-load`,
          `gatsby-remark-prismjs`, // needs to be the last
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lucas de Oliveira`,
        short_name: `Lucas de Oliveira`,
        start_url: `/`,
        background_color: `#1f1f23`,
        theme_color: `#1f1f23`,
        display: `minimal-ui`,
        icon: `src/images/profile-photo.jpeg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Cantora One`, `Varela Round`, "Consolas"],
        display: "swap",
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
