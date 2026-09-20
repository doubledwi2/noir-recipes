import React, { createContext, useContext, useMemo, ReactNode } from 'react';

type SubscriptionState = {
  // Whether the user currently has an active Pro subscription. Everything
  // that gates content on subscription status (recipe locks, the 10-item
  // favorites cap, hiding ads) reads this single value.
  isPro: boolean;
};

const SubscriptionContext = createContext<SubscriptionState>({ isPro: false });

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  // TODO(RevenueCat): Play Console subscription products + RevenueCat can't
  // be set up yet (blocked behind Closed Testing / Production access). Until
  // then this always reports `false`, so the app behaves as fully free-tier
  // for everyone. Once RevenueCat is wired in, replace this hardcoded value
  // with its real entitlement check (e.g. Purchases.getCustomerInfo()) --
  // no other file needs to change, since they all read from useSubscription().
  const value = useMemo<SubscriptionState>(() => ({ isPro: false }), []);

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
