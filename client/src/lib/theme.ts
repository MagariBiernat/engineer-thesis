import { extendTheme } from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

// FIXME types
const styles: { global: (props: any) => void } = {
  global: (props) => ({
    body: {
      bg: mode("#fafafa", "#020202")(props),
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
        color: mode("#3d7aed", "#fffafa")(props),
        textUnderlineOffset: 3,
      }),
    },
  }

const fonts = {
  heading: "'M PLUS Rounded 1c'",
}

const colors = {
  grassTeal: "#88ccca",
}

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
