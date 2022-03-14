import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

// FIXME types
const styles: { global: (props: any) => void } = {
  global: (props) => ({
    body: {
      bg: mode("rgb(,246,249,252)", "rgb(23,24,26)")(props),
      color: mode("#141414", "#f0e7db")(props),
    },
  }),
}

// FIXME types
const components: { Heading: any; Link: { baseStyle: (props: any) => void } } =
  {
    Heading: {
      variants: {
        "section-title": {
          textDecoration: "underline",
          fontSize: 20,
          textUnderlineOffset: 6,
          textDecorationColor: "#525252",
          textDecorationThickness: 4,
          marginTop: 3,
          marginBottom: 4,
        },
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: mode("#141414", "#fffafa")(props),
        textUnderlineOffset: 3,
      }),
    },
  }

const fonts = {
  body: "Helvetica, sans-serif",
}

const colors = {
  blueLight: "#33bfff",
  grassTeal: "#88ccca",
}

const config = {
  initialColorMode: "white",
  useSystemColorMode: true,
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
