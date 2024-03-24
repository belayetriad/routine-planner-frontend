import AppLayout from "@/Layout/AppLayout";
import "@/styles/globals.css";
import { createEmotionCache } from "@/utils/create-emotion-cache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { NextPage } from "next";
import type { AppProps } from "next/app";
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};
const clientSideEmotionCache = createEmotionCache();

export default function App(props: ExtendedAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);
  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} />)}
    </CacheProvider>
  );
}
