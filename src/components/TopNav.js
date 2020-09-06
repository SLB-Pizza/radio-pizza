import React, { useState, useEffect, useContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

import { GlobalStateContext } from "../context/GlobalContextProvider";
import { RadioBar, ScheduleBar } from "./index";

function TopNav() {
  const globalState = useContext(GlobalStateContext);

  const [nycTime, setNYCTime] = useState(dayjs().tz("America/New_York"));
  const [laTime, setLATime] = useState(dayjs().tz("America/Los_Angeles"));

  useEffect(() => {
    const clock = setInterval(() => {
      setNYCTime(nycTime.add(1, "s"));
      setLATime(laTime.add(1, "s"));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  });

  /**
   * Create the Apollo Client and give it our Prismic CMS graphql endpoint
   * @name ApolloPrismicClient
   * @see {@link https://www.apollographql.com/docs/react/get-started/#create-a-client|Create a Client}
   */
  const client = new ApolloClient({
    link: PrismicLink({
      uri: "https://hmbk-cms.prismic.io/graphql",
    }),
    cache: new InMemoryCache(),
  });

  /**
   * Wrapping the root client with `<ApolloProvider>` allows us to access {@link ApolloPrismicClient} from anywhere in our app. The `<ApolloProvider>` is similar to React's `Context.Provider`.
   *
   * @see {@link https://www.apollographql.com/docs/react/get-started/#connect-your-client-to-react|Connect the Client to the Project}
   * @see {@link https://reactjs.org/docs/context.html#contextprovider|React's Context Provider}
   */

  return (
    <ApolloProvider client={client}>
      <div
        className={
          globalState.live
            ? "radio-and-schedule-bar is-live"
            : "radio-and-schedule-bar"
        }
      >
        <RadioBar nycTime={nycTime} laTime={laTime} />
        <ScheduleBar timeNow={nycTime} />
      </div>
    </ApolloProvider>
  );
}

export default TopNav;
