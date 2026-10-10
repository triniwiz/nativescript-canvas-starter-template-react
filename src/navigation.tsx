import { createContext, useContext, type ComponentType } from 'react';
import { Frame, type NavigatedData, type Page } from '@nativescript/core';
import { render } from '@nativescript-community/react';
import { document } from 'dominative';

const PageContext = createContext<Page | null>(null);

/** The Page this screen was navigated to, or null on the home screen. */
export function usePage() {
  return useContext(PageContext);
}

/**
 * Shows `Screen` on a new Page. Each Page is its own React root, and it
 * unmounts when you navigate back from it, so effects clean up (canvases stop
 * drawing, Workers end) just as they would on the web.
 */
export function navigate(Screen: ComponentType) {
  const page = document.createElement('page') as Page;
  page.actionBarHidden = true;
  const unmount = render(
    <PageContext.Provider value={page}>
      <Screen />
    </PageContext.Provider>,
    page,
  );
  page.on('navigatedFrom', (args: NavigatedData) => {
    if (args.isBackNavigation) {
      unmount();
    }
  });
  Frame.topmost().navigate({ create: () => page });
}

export function goBack() {
  Frame.topmost().goBack();
}
