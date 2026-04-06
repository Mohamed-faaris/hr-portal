"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

import { env } from "~/env";

export function Mixpanel() {
  useEffect(() => {
    if (!env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
      return;
    }

    mixpanel.init(env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      autocapture: true,
      record_sessions_percent: 100,
      track_pageview: true,
    });
  }, []);

  return null;
}
