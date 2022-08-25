import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-slate-100 text-black antialiased dark:bg-gray-900 dark:text-white duration-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument